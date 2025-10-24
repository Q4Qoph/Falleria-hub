"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/axios-client";
import { useAuth } from "@/context/auth-context";

type FormStep = 1 | 2 | 3 | 4 | 5;

interface ApplicationData {
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
    phone: string;
    currentAddress: string;
  };
  academicHistory: {
    highSchool: {
      schoolName: string;
      country: string;
      graduationYear: string;
      gpa: string;
    };
    higherEducation: {
      universityName: string;
      degree: string;
      graduationYear: string;
      gpa: string;
    };
  };
  coursePreferences: {
    fieldOfStudy: string;
    preferredCountry: string;
    preferredUniversities: Array<{
      universityName: string;
      courseName: string;
    }>;
    intendedStartDate: string;
  };
  documents: {
    passport: File | null;
    transcripts: File | null;
    englishProficiency: File | null;
    statementOfPurpose: File | null;
    resume: File | null;
  };
}

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState<ApplicationData>({
    personalInfo: {
      fullName: "",
      dateOfBirth: "",
      nationality: "",
      passportNumber: "",
      phone: "",
      currentAddress: "",
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
    coursePreferences: {
      fieldOfStudy: "",
      preferredCountry: "",
      preferredUniversities: [
        { universityName: "", courseName: "" },
        { universityName: "", courseName: "" },
        { universityName: "", courseName: "" },
      ],
      intendedStartDate: "",
    },
    documents: {
      passport: null,
      transcripts: null,
      englishProficiency: null,
      statementOfPurpose: null,
      resume: null,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (keys.length === 2) {
      const [section, field] = keys;
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof ApplicationData] as any),
          [field]: value,
        },
      }));
    } else if (keys.length === 3) {
      const [section, subsection, field] = keys;
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof ApplicationData] as any),
          [subsection]: {
            ...(prev[section as keyof ApplicationData] as any)[subsection],
            [field]: value,
          },
        },
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: file,
      },
    }));
  };

  const handleUniversityChange = (
    index: number,
    field: "universityName" | "courseName",
    value: string
  ) => {
    const newUniversities = [
      ...formData.coursePreferences.preferredUniversities,
    ];
    newUniversities[index] = {
      ...newUniversities[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      coursePreferences: {
        ...prev.coursePreferences,
        preferredUniversities: newUniversities,
      },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      // Prepare the payload matching the required structure
      const payload = {
        personalInfo: formData.personalInfo,
        academicHistory: {
          highSchool: {
            schoolName: formData.academicHistory.highSchool.schoolName,
            country: formData.academicHistory.highSchool.country,
            graduationYear:
              parseInt(formData.academicHistory.highSchool.graduationYear) || 0,
            gpa: formData.academicHistory.highSchool.gpa,
          },
          higherEducation: formData.academicHistory.higherEducation
            .universityName
            ? [
                {
                  universityName:
                    formData.academicHistory.higherEducation.universityName,
                  degree: formData.academicHistory.higherEducation.degree,
                  graduationYear:
                    parseInt(
                      formData.academicHistory.higherEducation.graduationYear
                    ) || 0,
                  gpa: formData.academicHistory.higherEducation.gpa,
                },
              ]
            : [],
        },
        coursePreferences: {
          fieldOfStudy: formData.coursePreferences.fieldOfStudy,
          preferredCountry: formData.coursePreferences.preferredCountry,
          preferredUniversities:
            formData.coursePreferences.preferredUniversities.filter(
              (u) => u.universityName && u.courseName
            ),
          intendedStartDate: formData.coursePreferences.intendedStartDate,
        },
      };

      // Add JSON payload as a string field
      formDataToSend.append("data", JSON.stringify(payload));

      // Add files
      if (formData.documents.passport)
        formDataToSend.append("passport", formData.documents.passport);
      if (formData.documents.transcripts)
        formDataToSend.append("transcripts", formData.documents.transcripts);
      if (formData.documents.englishProficiency)
        formDataToSend.append(
          "englishProficiency",
          formData.documents.englishProficiency
        );
      if (formData.documents.statementOfPurpose)
        formDataToSend.append(
          "statementOfPurpose",
          formData.documents.statementOfPurpose
        );
      if (formData.documents.resume)
        formDataToSend.append("resume", formData.documents.resume);

      const response = await apiClient.post("/applications", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Initiate checkout after successful application submission
      const checkoutResponse = await apiClient.post("/payments/checkout", {
        appId: response.data.applicationId,
        successUrl: `${window.location.origin}/student/payment/success?applicationId=${response.data.applicationId}`,
        cancelUrl: `${window.location.origin}/student/payment/cancel?applicationId=${response.data.applicationId}`,
      });

      // Redirect to Stripe checkout
      if (checkoutResponse.data.url) {
        window.location.href = checkoutResponse.data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

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
              name="personalInfo.currentAddress"
              placeholder="Current Address"
              value={formData.personalInfo.currentAddress}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Academic History</h2>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">
                High School / Secondary Education
              </h3>
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
              <h3 className="text-lg font-semibold mb-4">
                Higher Education (if applicable)
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="academicHistory.higherEducation.universityName"
                  placeholder="University Name"
                  value={
                    formData.academicHistory.higherEducation.universityName
                  }
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
                  value={
                    formData.academicHistory.higherEducation.graduationYear
                  }
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
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Course Preferences</h2>
            <select
              name="coursePreferences.fieldOfStudy"
              value={formData.coursePreferences.fieldOfStudy}
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
              name="coursePreferences.preferredCountry"
              value={formData.coursePreferences.preferredCountry}
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
              <h3 className="text-lg font-semibold mb-4">
                Preferred Universities (up to 3)
              </h3>
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className="mb-4 p-4 border border-border rounded-lg"
                >
                  <p className="text-sm font-semibold mb-2">
                    University {idx + 1}
                  </p>
                  <input
                    type="text"
                    placeholder="University Name"
                    value={
                      formData.coursePreferences.preferredUniversities[idx]
                        .universityName
                    }
                    onChange={(e) =>
                      handleUniversityChange(
                        idx,
                        "universityName",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Course Name"
                    value={
                      formData.coursePreferences.preferredUniversities[idx]
                        .courseName
                    }
                    onChange={(e) =>
                      handleUniversityChange(idx, "courseName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Intended Start Date
              </label>
              <input
                type="date"
                name="coursePreferences.intendedStartDate"
                value={formData.coursePreferences.intendedStartDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Document Upload</h2>
            <p className="text-secondary text-sm mb-6">
              Upload all required documents (PDF, JPG, DOCX)
            </p>

            {[
              { key: "passport", label: "Passport Scanned Copy" },
              {
                key: "transcripts",
                label: "Academic Transcripts / Certificates",
              },
              {
                key: "englishProficiency",
                label: "Proof of English Proficiency (IELTS/TOEFL)",
              },
              {
                key: "statementOfPurpose",
                label: "Statement of Purpose / Personal Essay",
              },
              { key: "resume", label: "Resume / CV" },
            ].map((doc) => (
              <div
                key={doc.key}
                className="border-2 border-dashed border-border rounded-lg p-4"
              >
                <label className="block">
                  <span className="text-sm font-semibold text-foreground mb-2 block">
                    {doc.label}
                  </span>
                  <input
                    type="file"
                    name={doc.key}
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.docx,.doc"
                    className="w-full"
                  />
                  {formData.documents[
                    doc.key as keyof typeof formData.documents
                  ] && (
                    <p className="text-sm text-green-600 mt-2">
                      {
                        (
                          formData.documents[
                            doc.key as keyof typeof formData.documents
                          ] as File
                        )?.name
                      }
                    </p>
                  )}
                </label>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Review Your Application</h2>

            <div className="bg-neutral-50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Personal Information
                </h3>
                <p className="text-sm text-secondary">
                  Name: {formData.personalInfo.fullName}
                  <br />
                  DOB: {formData.personalInfo.dateOfBirth}
                  <br />
                  Nationality: {formData.personalInfo.nationality}
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-primary mb-2">
                  Academic History
                </h3>
                <p className="text-sm text-secondary">
                  High School: {formData.academicHistory.highSchool.schoolName}
                  <br />
                  GPA: {formData.academicHistory.highSchool.gpa}
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-primary mb-2">
                  Course Preferences
                </h3>
                <p className="text-sm text-secondary">
                  Field: {formData.coursePreferences.fieldOfStudy}
                  <br />
                  Country: {formData.coursePreferences.preferredCountry}
                  <br />
                  Universities:{" "}
                  {formData.coursePreferences.preferredUniversities
                    .filter((u) => u.universityName)
                    .map((u) => `${u.universityName} (${u.courseName})`)
                    .join(", ")}
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-primary mb-2">Documents</h3>
                <p className="text-sm text-secondary">
                  {Object.values(formData.documents).filter((d) => d).length} of
                  5 documents uploaded
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 w-full">
      <div className="">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 mx-1 rounded-full ${
                  step <= currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-secondary text-sm">
            Step {currentStep} of 5
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg mb-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() =>
              setCurrentStep((prev) => Math.max(1, prev - 1) as FormStep)
            }
            disabled={currentStep === 1}
            className="flex-1 px-6 py-3 border border-border rounded-lg font-semibold hover:bg-neutral-50 disabled:opacity-50 transition"
          >
            Previous
          </button>

          {currentStep < 5 ? (
            <button
              onClick={() =>
                setCurrentStep((prev) => Math.min(5, prev + 1) as FormStep)
              }
              className="flex-1 btn-primary"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
