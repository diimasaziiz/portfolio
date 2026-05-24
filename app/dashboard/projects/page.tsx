'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SquarePen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { omit } from 'remeda'
import { toast } from 'sonner'
import useSWR from 'swr'
import z from 'zod'

import { BaseTable } from '@/components/base/base-table'
import FormProject, { formSchema } from '@/components/form/form-project'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { createClient } from '@/lib/supabase/client'
import { Project, Technology } from '@/types'

export default function Page() {
  const supabase = createClient()

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)

  /**
   * SWR FETCHER
   */

  const fetcherTech = async () => {
    const { data, error } = await supabase
      .from('technologies')
      .select('*')
      .overrideTypes<Technology[]>()

    if (error) throw error
    return data ?? []
  }

  const { data: technologies = [] } = useSWR('technologies', fetcherTech)

  const technologyOpts = technologies.map((tech) => ({ label: tech.name, value: tech.id }))

  const fetcher = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .select('*, project_technologies(tech_id, technologies(name))')
      .overrideTypes<Project[]>()

    if (error) throw error
    if (!data) return []

    // 2. Transformasi data: ubah array of object menjadi array of string
    const transformedData = data.map((project) => ({
      ...project,
      // Ubah [{tech_id: 'a'}, {tech_id: 'b'}] menjadi ['a', 'b']
      tech_stack: project.project_technologies.map((pt) => ({
        label: pt.technologies.name,
        value: pt.tech_id,
      })),
    }))

    return transformedData as Project[]
  }

  const { data = [], mutate, isLoading } = useSWR('projects', fetcher)

  /**
   * HANDLERS
   */
  const handleCreate = () => {
    setSelected(null)
    setIsOpen(true)
  }

  const handleEdit = (tech: Project) => {
    console.log(tech)
    setSelected(tech)
    setIsOpen(true)
  }

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    const selectedTechIds = formData.tech_stack?.map((tech) => tech.value)

    let currentProjectId = selected?.id
    try {
      if (currentProjectId) {
        const { error } = await supabase
          .from('projects')
          .update(omit(formData, ['tech_stack']))
          .eq('id', currentProjectId)

        if (error) throw error

        // Hapus semua relasi teknologi lama terlebih dahulu
        const { error: delErr } = await supabase
          .from('project_technologies')
          .delete()
          .eq('project_id', currentProjectId)
        if (delErr) throw delErr
      } else {
        const { data: newProject, error } = await supabase
          .from('projects')
          .insert([omit(formData, ['tech_stack'])])
          .select()
          .single()

        if (error) throw error
        currentProjectId = newProject?.id
      }

      // --- INSERT RELASI TEKNOLOGI BARU (Untuk Create & Update) ---
      if (selectedTechIds && selectedTechIds.length > 0 && currentProjectId) {
        // Bentuk array of object sesuai struktur tabel penghubung
        const pivotData = selectedTechIds?.map((techId) => ({
          project_id: currentProjectId,
          tech_id: techId,
        }))

        const { error: pivotErr } = await supabase.from('project_technologies').insert(pivotData)

        if (pivotErr) throw pivotErr
      }

      toast.success(selected?.id ? 'Project updated!' : 'Project created!')
      setIsOpen(false)
      await mutate() // ✅ refresh data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return

    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) {
      toast.error('Delete failed')
    } else {
      toast.success('Deleted successfully')
      await mutate() // ✅ refresh data
    }
  }

  const handleFeaturedChange = async (isFeatured: boolean, payload: Project): Promise<void> => {
    const { error } = await supabase
      .from('projects')
      .update({ ...omit(payload, ['project_technologies', 'tech_stack']), is_featured: isFeatured })
      .eq('id', payload.id)

    if (error) {
      toast.error(error.message)
      return
    }

    await mutate() // ✅ refresh data
    toast.success('Updated successfully')
  }
  /**
   * COLUMNS
   */
  const columns: ColumnDef<Project>[] = [
    { header: 'No', cell: ({ row }) => <p>{row.index + 1}</p> },
    { accessorKey: 'title', header: 'Title' },
    {
      accessorKey: 'description',
      header: 'Short Description',
      cell: ({ row }) => (
        <div className="line-clamp-6 w-[20rem] whitespace-normal">{row.original.description}</div>
      ),
    },
    {
      accessorKey: 'image_url',
      header: 'Image Url',
      cell: ({ row }) => (
        <a href={row.original.image_url} target="_blank">
          Open Link
        </a>
      ),
    },
    {
      accessorKey: 'tech_stack',
      header: 'Tech Stack',
      cell: ({ row }) => (
        <ul>
          {row.original.tech_stack?.map((tech) => (
            <li key={tech.value} className="mr-2">
              {tech.label}
            </li>
          ))}
        </ul>
      ),
    },
    {
      accessorKey: 'is_featured',
      header: 'Featured',
      cell: ({ row }) => (
        <Switch
          checked={row.original.is_featured}
          onCheckedChange={(checked) => handleFeaturedChange(checked, row.original)}
        ></Switch>
      ),
    },
    {
      id: 'action',
      header: 'Action',
      size: 40,
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
            <SquarePen className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  /**
   * RENDER
   */
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Project</h1>
        <Button onClick={handleCreate}>Create</Button>
      </div>

      <BaseTable columns={columns} data={data!} />

      <FormProject
        key={selected?.id || 'new'}
        open={isOpen}
        technologyOpts={technologyOpts}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
        defaultValues={selected}
        isLoading={isLoading}
      />
    </div>
  )
}
