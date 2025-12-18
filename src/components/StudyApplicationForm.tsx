"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import apiClient from "@/lib/axios-client"

const studyApplicationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone is required").max(20, "Phone must be less than 20 characters"),
  levelOfStudy: z.string().trim().min(1, "Level of study is required"),
  subject: z.string().trim().min(1, "Subject is required").max(150, "Subject must be less than 150 characters"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters"),
})

interface StudyApplicationFormProps {
  country: string
  compact?: boolean
}

export default function StudyApplicationForm({ country, compact = false }: StudyApplicationFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    levelOfStudy: "",
    subject: `Study in ${country} Inquiry`,
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      studyApplicationSchema.parse(formData)
      setErrors({})
      setIsSubmitting(true)

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Study in ${country} - ${formData.levelOfStudy}`,
        message: formData.message || `Interested in ${formData.levelOfStudy} programs in ${country}.`,
      }

      await apiClient.post("/inquiries", payload)

      toast({
        title: "Application submitted successfully!",
        description: "Our team will contact you within 24 hours to discuss your study options.",
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        levelOfStudy: "",
        subject: `Study in ${country} Inquiry`,
        message: "",
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0].toString()] = err.message
        })
        setErrors(newErrors)
      } else {
        console.error(error)
        toast({
          title: "Submission failed",
          description: "Something went wrong. Please try again or contact us directly.",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={compact ? "space-y-5" : "grid sm:grid-cols-2 gap-5"}>
        <div>
          <Label htmlFor="name" className="text-sm font-medium mb-2 block">
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="h-11"
            maxLength={100}
          />
          {errors.name && <p className="text-sm text-destructive mt-1.5">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium mb-2 block">
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="h-11"
            maxLength={255}
          />
          {errors.email && <p className="text-sm text-destructive mt-1.5">{errors.email}</p>}
        </div>
      </div>

      <div className={compact ? "space-y-5" : "grid sm:grid-cols-2 gap-5"}>
        <div>
          <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
            Phone Number *
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+254 712 345 678"
            className="h-11"
            maxLength={20}
          />
          {errors.phone && <p className="text-sm text-destructive mt-1.5">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="levelOfStudy" className="text-sm font-medium mb-2 block">
            Level Of Study *
          </Label>
          <select
            id="levelOfStudy"
            name="levelOfStudy"
            value={formData.levelOfStudy}
            onChange={handleChange as any}
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select level of study</option>
            <option value="High School">High School / KCSE / IGCSE</option>
            <option value="Diploma">Diploma</option>
            <option value="Foundation">Foundation</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Master's Degree">Master&apos;s Degree</option>
            <option value="PhD">PhD</option>
          </select>
          {errors.levelOfStudy && <p className="text-sm text-destructive mt-1.5">{errors.levelOfStudy}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="message" className="text-sm font-medium mb-2 block">
          Additional Information (Optional)
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your academic goals, preferred programs, or any questions you have..."
          className="min-h-[100px] resize-none"
          maxLength={1000}
        />
        {errors.message && <p className="text-sm text-destructive mt-1.5">{errors.message}</p>}
      </div>

      <Button type="submit" className="w-full h-11 text-sm font-medium" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Start Your Journey"}
      </Button>
    </form>
  )
}
