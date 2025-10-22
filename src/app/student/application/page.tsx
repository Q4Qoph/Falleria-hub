"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import apiClient from "@/lib/axios-client"
import { useAuth } from "@/context/auth-context"

type FormStep = 1 | 2 | 3 | 4 | 5

interface ApplicationData {
  personalInfo: {
    fullName: string
    dateOfBirth: string
    nationality: string
    passportNumber: string
    phone: string
    address: string
  }
  academicHistory: {
    highSchool: {
      schoolName: string
      country: string
      graduationYear: string
      gpa: string
    }
    higherEducation: {
      universityName: string
      degree: string
      graduationYear: string
      gpa: string
    }
  }
  coursePreference: {
    fieldOfStudy: string
    preferredCountry: string
    universities: string[]
    startDate: string
  }
  documents: {
    passport: File | null
    transcripts: File | null
    englishProficiency: File | null
    statementOfPurpose: File | null
    resume: File | null
  }
}

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { user } = useAuth()

  const [formData, setFormData] = useState<ApplicationData>({
    personalInfo: {
      fullName: "",
      dateOfBirth: "",
      nationality: "",
      passportNumber: "",
      phone: "",
      address: "",
    },
    academicHistory: {
      highSchool: {
        schoolName: "",
        country: "",
        graduationYear: "",
        gpa: "",
      },
      higherEducation: {
        universityName: "",
        degree: "",
        graduationYear: "",
        gpa: "",
      },
    },
    coursePreference: {
      fieldOfStudy: "",
      preferredCountry: "",
      universities: ["", "", ""],
      startDate: "",
    },
    documents: {
      passport: null,
      transcripts: null,
      englishProficiency: null,
      statementOfPurpose: null,
      resume: null,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const keys = name.split(".")

    if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0] as keyof ApplicationData],
          [keys[1]]: value,
        },
      }))
    } else if (keys.length === 3) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0] as keyof ApplicationData],
          [keys[1]]: {
            ...prev[keys[0] as keyof ApplicationData][keys[1] as any],
            [keys[2]]: value,
          },
        },
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: file,
      },
    }))
  }

  const handleUniversityChange = (index: number, value: string) => {
    const newUniversities = [...formData.coursePreference.universities]
    newUniversities[index] = value
    setFormData((prev) => ({
      ...prev,
      coursePreference: {
        ...prev.coursePreference,
        universities: newUniversities,
      },
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError("")

    try {
      const formDataToSend = new FormData()

      // Add all form data as JSON
      formDataToSend.append("personalInfo", JSON.stringify(formData.personalInfo))
      formDataToSend.append("academicHistory", JSON.stringify(formData.academicHistory))
      formDataToSend.append("coursePreference", JSON.stringify(formData.coursePreference))

      // Add files
      if (formData.documents.passport) formDataToSend.append("passport", formData.documents.passport)
      if (formData.documents.transcripts) formDataToSend.append("transcripts", formData.documents.transcripts)
      if (formData.documents.englishProficiency)
        formDataToSend.append("englishProficiency", formData.documents.englishProficiency)
      if (formData.documents.statementOfPurpose)
        formDataToSend.append("statementOfPurpose", formData.documents.statementOfPurpose)
      if (formData.documents.resume) formDataToSend.append("resume", formData.documents.resume)

      const response = await apiClient.post("/applications", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      router.push(`/student/payment/${response.data.applicationId}`)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit application")
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <input
              type="text"
              name="personalInfo.fullName"
              placeholder="Full Name"
              value={formData.personalInfo.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="date"
              name="personalInfo.dateOfBirth"
              value={formData.personalInfo.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              name="personalInfo.nationality"
              placeholder="Nationality"
              value={formData.personalInfo.nationality}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              name="personalInfo.passportNumber"
              placeholder="Passport Number"
              value={formData.personalInfo.passportNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="tel"
              name="personalInfo.phone"
              placeholder="Phone Number"
              value={formData.personalInfo.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              name="personalInfo.address"
              placeholder="Current Address"
              value={formData.personalInfo.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Academic History</h2>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">High School / Secondary Education</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="academicHistory.highSchool.schoolName"
                  placeholder="School Name"
                  value={formData.academicHistory.highSchool.schoolName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  name="academicHistory.highSchool.country"
                  placeholder="Country"
                  value={formData.academicHistory.highSchool.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  name="academicHistory.highSchool.graduationYear"
                  placeholder="Graduation Year"
                  value={formData.academicHistory.highSchool.graduationYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  name="academicHistory.highSchool.gpa"
                  placeholder="GPA / Grades"
                  value={formData.academicHistory.highSchool.gpa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Higher Education (if applicable)</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="academicHistory.higherEducation.universityName"
                  placeholder="University Name"
                  value={formData.academicHistory.higherEducation.universityName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  name="academicHistory.higherEducation.degree"
                  placeholder="Degree"
                  value={formData.academicHistory.higherEducation.degree}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  name="academicHistory.higherEducation.graduationYear"
                  placeholder="Graduation Year"
                  value={formData.academicHistory.higherEducation.graduationYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  name="academicHistory.higherEducation.gpa"
                  placeholder="GPA / Grades"
                  value={formData.academicHistory.higherEducation.gpa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Course Preferences</h2>
            <select
              name="coursePreference.fieldOfStudy"
              value={formData.coursePreference.fieldOfStudy}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Field of Study</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Medicine">Medicine</option>
              <option value="Law">Law</option>
              <option value="Arts">Arts & Humanities</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
            </select>

            <select
              name="coursePreference.preferredCountry"
              value={formData.coursePreference.preferredCountry}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Preferred Country</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Singapore">Singapore</option>
              <option value="Japan">Japan</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Netherlands">Netherlands</option>
            </select>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Preferred Universities (up to 3)</h3>
              {[0, 1, 2].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`University ${idx + 1}`}
                  value={formData.coursePreference.universities[idx]}
                  onChange={(e) => handleUniversityChange(idx, e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                />
              ))}
            </div>

            <input
              type="date"
              name="coursePreference.startDate"
              value={formData.coursePreference.startDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Document Upload</h2>
            <p className="text-secondary text-sm mb-6">Upload all required documents (PDF, JPG, DOCX)</p>

            {[
              { key: "passport", label: "Passport Scanned Copy" },
              { key: "transcripts", label: "Academic Transcripts / Certificates" },
              { key: "englishProficiency", label: "Proof of English Proficiency (IELTS/TOEFL)" },
              { key: "statementOfPurpose", label: "Statement of Purpose / Personal Essay" },
              { key: "resume", label: "Resume / CV" },
            ].map((doc) => (
              <div key={doc.key} className="border-2 border-dashed border-border rounded-lg p-4">
                <label className="block">
                  <span className="text-sm font-semibold text-foreground mb-2 block">{doc.label}</span>
                  <input
                    type="file"
                    name={doc.key}
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.docx,.doc"
                    className="w-full"
                  />
                  {formData.documents[doc.key as keyof typeof formData.documents] && (
                    <p className="text-sm text-green-600 mt-2">
                      {(formData.documents[doc.key as keyof typeof formData.documents] as File)?.name}
                    </p>
                  )}
                </label>
              </div>
            ))}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Review Your Application</h2>

            <div className="bg-neutral-50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold text-primary mb-2">Personal Information</h3>
                <p className="text-sm text-secondary">
                  Name: {formData.personalInfo.fullName}
                  <br />
                  DOB: {formData.personalInfo.dateOfBirth}
                  <br />
                  Nationality: {formData.personalInfo.nationality}
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-primary mb-2">Academic History</h3>
                <p className="text-sm text-secondary">
                  High School: {formData.academicHistory.highSchool.schoolName}
                  <br />
                  GPA: {formData.academicHistory.highSchool.gpa}
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-primary mb-2">Course Preferences</h3>
                <p className="text-sm text-secondary">
                  Field: {formData.coursePreference.fieldOfStudy}
                  <br />
                  Country: {formData.coursePreference.preferredCountry}
                  <br />
                  Universities: {formData.coursePreference.universities.filter((u) => u).join(", ")}
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-primary mb-2">Documents</h3>
                <p className="text-sm text-secondary">
                  {Object.values(formData.documents).filter((d) => d).length} of 5 documents uploaded
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 mx-1 rounded-full ${step <= currentStep ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </div>
          <p className="text-center text-secondary text-sm">Step {currentStep} of 5</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
          )}

          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1) as FormStep)}
            disabled={currentStep === 1}
            className="flex-1 px-6 py-3 border border-border rounded-lg font-semibold hover:bg-neutral-50 disabled:opacity-50 transition"
          >
            Previous
          </button>

          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1) as FormStep)}
              className="flex-1 btn-primary"
            >
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading} className="flex-1 btn-primary disabled:opacity-50">
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
