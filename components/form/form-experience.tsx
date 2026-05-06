'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import MDEditor from '@uiw/react-md-editor'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { Experience } from '@/types'

export const formSchema = z.object({
  company_name: z.string().min(1, 'Company Name is required'),
  company_logo_url: z.url('Company Logo Url is required'),
  position: z.string().min(1, 'Position is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  is_current: z.boolean(),
  start_date: z.date('Start Date is required'),
  end_date: z.date('End Date is required').optional(),
})

type Props = {
  open: boolean
  isLoading: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: z.infer<typeof formSchema>) => void
  defaultValues?: Experience | null
}
const DEFAULT_VALUES = {
  company_name: '',
  company_logo_url: '',
  position: '',
  location: '',
  description: '',
  is_current: false,
  start_date: undefined,
  end_date: undefined,
}

export function FormExperience({ open, isLoading, onOpenChange, onSubmit, defaultValues }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
  })

  const [endDateDisabled, setEndDateDisabled] = useState(false)

  // populate form when editing

  useEffect(() => {
    const values = open ? (defaultValues ?? DEFAULT_VALUES) : DEFAULT_VALUES

    form.reset(values)

    if (!open) {
      form.clearErrors()
    }
  }, [open, defaultValues, form])

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleIsCurrentChange = (isCurrent: boolean, onChange: (...event: any[]) => void): void => {
    if (isCurrent) {
      form.setValue('end_date', undefined)
      form.clearErrors('end_date')
    } else {
      form.setError('end_date', { message: 'End Date is required' })
    }
    setEndDateDisabled(isCurrent)
    onChange(isCurrent)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-20rem)]!">
        <DialogHeader>
          <DialogTitle>{defaultValues?.id ? 'Edit Experience' : 'Create Experience'}</DialogTitle>
        </DialogHeader>

        <form id="form-experience" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="position"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Position</FieldLabel>
                  <Input {...field} placeholder="Please input position..." />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="company_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Company Name</FieldLabel>
                  <Input {...field} placeholder="Please input company name..." />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="company_logo_url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Company Logo Url</FieldLabel>
                  <Input {...field} placeholder="Please input company logo url..." />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Location</FieldLabel>
                  <Input {...field} placeholder="Please input location..." />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <MDEditor height={500} {...field} />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="start_date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Start Date</FieldLabel>
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
              name="end_date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>End Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      disabled={endDateDisabled}
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
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="is_current"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="current">I am currently working in this role</Label>
                  <Switch
                    id="current"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={(isCurrent) => {
                      handleIsCurrentChange(isCurrent, field.onChange)
                    }}
                    aria-invalid={fieldState.invalid}
                  />
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
          <Button form="form-experience" type="submit" loading={isLoading}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
