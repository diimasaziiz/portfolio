/* eslint-disable @next/next/no-img-element */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import MDEditor from '@uiw/react-md-editor'
import { format } from 'date-fns'
import { SquarePen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'
import z from 'zod'

import { BaseDialogDelete } from '@/components/base/base-dialog-delete'
import { BaseTable } from '@/components/base/base-table'
import { FormExperience, formSchema } from '@/components/form/form-experience'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { createClient } from '@/lib/supabase/client'
import { Experience } from '@/types'

export default function Page() {
  const supabase = createClient()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [selected, setSelected] = useState<Experience | null>(null)
  const [deleteId, setDeleteId] = useState<string>('')

  /**
   * SWR FETCHER
   */
  const fetcher = async () => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('start_date', { ascending: false })
      .overrideTypes<Experience[]>()

    if (error) throw error
    return data ?? []
  }

  const { data = [], mutate, isLoading } = useSWR('experiences', fetcher)

  /**
   * HANDLERS
   */
  const handleCreate = () => {
    setSelected(null)
    setIsOpen(true)
  }

  const handleEdit = (tech: Experience) => {
    setSelected(tech)
    setIsOpen(true)
  }

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      if (selected?.id) {
        const { error } = await supabase.from('experiences').update(formData).eq('id', selected.id)

        if (error) throw error
        toast.success('Updated successfully')
      } else {
        const { error } = await supabase.from('experiences').insert([formData])

        if (error) throw error
        toast.success('Created successfully')
      }

      setIsOpen(false)
      await mutate() // ✅ refresh data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    const { error } = await supabase.from('experiences').delete().eq('id', id)

    if (error) {
      toast.error('Delete failed')
    } else {
      toast.success('Deleted successfully')
      await mutate() // ✅ refresh data
    }
    setIsDeleting(false)
  }

  /**
   * COLUMNS
   */
  const columns: ColumnDef<Experience>[] = [
    { accessorKey: 'position', header: 'Position' },
    { accessorKey: 'company_name', header: 'Company Name' },
    {
      accessorKey: 'company_logo_url',
      header: 'Company Logo',
      cell: ({ row }) => {
        return (
          <div>
            <img src={row.original.company_logo_url} alt={row.original.company_name} height={24} />
          </div>
        )
      },
    },
    { accessorKey: 'location', header: 'Location' },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <div className="w-160">
          <MDEditor.Markdown
            source={row.original.description}
            style={{ backgroundColor: 'transparent', whiteSpace: 'pre-wrap' }}
          />
        </div>
      ),
    },
    {
      accessorKey: 'start_date',
      header: 'Start Date',
      cell: ({ row }) => <p>{format(row.original.start_date, 'dd MMMM yyyy')}</p>,
    },
    {
      accessorKey: 'end_date',
      header: 'End Date',
      cell: ({ row }) => (
        <p>{row.original.end_date ? format(row.original.end_date, 'dd MMMM yyyy') : '-'}</p>
      ),
    },
    {
      accessorKey: 'is_current',
      header: 'Is Current',
      cell: ({ row }) => <Checkbox readOnly defaultChecked={row.original.is_current} />,
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
            onClick={() => setDeleteId(row.original.id)}
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
        <h1 className="text-2xl font-bold">Manage Experience</h1>
        <Button onClick={handleCreate}>Create</Button>
      </div>

      <BaseTable columns={columns} data={data!} />

      <BaseDialogDelete
        open={!!deleteId}
        isLoading={isDeleting}
        onOpenChange={(open) => !open && setDeleteId('')}
        onConfirm={async () => {
          if (!deleteId) return
          await handleDelete(deleteId)
          setDeleteId('')
        }}
      />

      <FormExperience
        key={selected?.id || 'new'}
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
        defaultValues={selected}
        isLoading={isLoading}
      />
    </div>
  )
}
