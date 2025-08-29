import React, { useEffect } from "react"
import { Controller, Control, FieldValues, RegisterOptions } from "react-hook-form"
import { useQuill } from "react-quilljs"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import "quill/dist/quill.snow.css"

interface QuillTextEditorProps<T extends FieldValues> {
  name: string
  control: Control<T>
  label?: string
  placeholder?: string
  className?: string
  rules?: RegisterOptions
  description?: string
}

export default function QuillTextEditor<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "",
  className = "",
  rules,
  description,
}: QuillTextEditorProps<T>) {
  const { quill, quillRef } = useQuill()

  useEffect(() => {
    if (quill) {
      quill.root.dataset.placeholder = placeholder
    }
  }, [quill, placeholder])

  return (
    <FormField
      name={name}
      control={control}
      rules={rules}
      defaultValue=""
      render={({ field, fieldState }) => {
        const { error } = fieldState

        useEffect(() => {
          if (quill) {
            quill.clipboard.dangerouslyPasteHTML(field.value || "")
            quill.on("text-change", () => {
              const html = quill.root.innerHTML
              field.onChange(html === "<p><br></p>" ? "" : html)
            })
          }
        }, [quill])

        return (
          <div className="">
            <FormItem className="mb-6">
              {label && <Label className="mb-2 block text-sm font-medium">{label}</Label>}
              {description && <FormDescription className="">{description}</FormDescription>}
              <FormControl>
                <div className="mb-5">
                  <input type="hidden" {...field} />
                  <div
                    ref={quillRef}
                    className={`min-h-[200px] rounded-md px-3 py-2 bg-white dark:bg-background border ${error ? "border-destructive" : "border-input"
                      } ${className}`}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )
      }}
    />
  )
}
