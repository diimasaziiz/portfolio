'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Project } from '@/types'

import BaseMDEditor from '../base/base-md-editor'
import { Calendar } from '../ui/calendar'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '../ui/combobox'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Textarea } from '../ui/textarea'

export const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Short Description is required'),
  content: z.string().min(1, 'Content is required'),
  image_url: z.url('Image Url is required'),
  demo_url: z.url().optional(),
  github_url: z.url('Github Url is required'),
  tech_stack: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  date_published: z.date('Date Published is required'),
  is_featured: z.boolean(),
})

/**
 * SETUP LOCAL INTERFACE
 */

type Props = {
  open: boolean
  isLoading: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: z.infer<typeof formSchema>) => void
  technologyOpts: { label: string; value: string }[]
  defaultValues?: Project | null
}

const DEFAULT_VALUES = {
  title: '',
  description: '',
  content: '',
  image_url: '',
  demo_url: '',
  github_url: '',
  tech_stack: [],
  is_featured: false,
}

export default function FormProject({
  open,
  isLoading,
  onOpenChange,
  onSubmit,
  defaultValues,
  technologyOpts,
}: Props) {
  /**
   * SETUP HOOKS
   */
  const anchor = useComboboxAnchor()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
  })

  /**
   * SETUP STATE
   */

  /**
   * SETUP COMPUTED
   */

  /**
   * SETUP FUNCTIONS
   */

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
  }

  /**
   * SETUP EFFECTS
   */
  useEffect(() => {
    const values = open ? (defaultValues ?? DEFAULT_VALUES) : DEFAULT_VALUES

    form.reset(values)

    if (!open) {
      form.clearErrors()
    }
  }, [open, defaultValues, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-20rem)]!">
        <DialogHeader>
          <DialogTitle>{defaultValues?.id ? 'Edit Project' : 'Create Project'}</DialogTitle>
        </DialogHeader>

        <form
          id="form-project"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="no-scrollbar max-h-[calc(100dvh-20rem)] space-y-4 overflow-auto"
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Title</FieldLabel>
                  <Input {...field} placeholder="Please input title..." />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Short Description</FieldLabel>
                  <Textarea {...field} placeholder="Please input short description..." />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="tech_stack"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tech Stack</FieldLabel>
                  <Combobox
                    multiple
                    items={technologyOpts}
                    itemToStringValue={(opt) => opt.label}
                    value={field.value ?? []}
                    onValueChange={field.onChange}
                  >
                    <ComboboxChips ref={anchor} className="w-full max-w-xs">
                      <ComboboxValue>
                        {(values) => (
                          <React.Fragment>
                            {values.map((value: { label: string; value: string }) => (
                              <ComboboxChip key={value.value}>{value.label}</ComboboxChip>
                            ))}
                            <ComboboxChipsInput />
                          </React.Fragment>
                        )}
                      </ComboboxValue>
                    </ComboboxChips>
                    <ComboboxContent anchor={anchor}>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item.value} value={item}>
                            {item.label}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="date_published"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Date Published</FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                        />
                      }
                    >
                      <CalendarIcon />
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Content</FieldLabel>
                  <BaseMDEditor height={800} {...field} />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="image_url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Image Url</FieldLabel>
                  <Textarea {...field} placeholder="Please input image url..." />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="demo_url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Demo Url</FieldLabel>
                  <Textarea {...field} placeholder="Please input demo url..." />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="github_url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Github Url</FieldLabel>
                  <Textarea {...field} placeholder="Please input github url..." />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button form="form-project" type="submit" loading={isLoading}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
