"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Check } from 'lucide-react'

type ChecklistItem = {
  id: string
  label: string
}

type Category = {
  id: string
  title: string
  items: ChecklistItem[]
}

const categories: Category[] = [
  {
    id: "login",
    title: "Login & Welcome",
    items: [
      { id: "login-email", label: "Login with email or phone number" },
      { id: "welcome-screen", label: "Welcome screen and rental information display" },
    ],
  },
  {
    id: "checkin",
    title: "Check-In",
    items: [
      { id: "id-verification", label: "ID Verification" },
      { id: "agreement-signature", label: "Agreement Signature" },
      { id: "coverage-insurance", label: "Coverage / Insurance Options" },
      { id: "addons-selection", label: "Add-Ons Selection" },
    ],
  },
  {
    id: "pickup",
    title: "Pick-Up",
    items: [
      { id: "video-display", label: "Video Display (how-to or vehicle overview)" },
      { id: "vehicle-location", label: "Vehicle Location" },
      { id: "pretrip-photos", label: "Pre-Trip Photos" },
      { id: "code-display", label: "Code Display or Lock / Unlock" },
      { id: "open-screen", label: "Open Screen" },
      { id: "good-trip", label: '"Good Trip" Screen' },
    ],
  },
  {
    id: "dropoff",
    title: "Drop-Off",
    items: [
      { id: "checklist-reminder", label: "Checklist Reminder" },
      { id: "posttrip-photos", label: "Post-Trip Photos" },
      { id: "key-photo", label: "Key Photo" },
      { id: "lock-screen", label: "Lock Screen" },
      { id: "dropoff-form", label: "Drop-Off Form" },
      { id: "feedback-form", label: "Feedback Form" },
      { id: "google-review", label: "Google Review" },
    ],
  },
]

export default function WorkshopChecklist() {
  const [isMainExpanded, setIsMainExpanded] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const toggleItem = (itemId: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId)
    } else {
      newSelected.add(itemId)
    }
    setSelectedItems(newSelected)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Main accordion header */}
      <button
        onClick={() => setIsMainExpanded(!isMainExpanded)}
        className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-colors"
      >
        <h3 className="text-2xl font-bold text-gray-900">
          Flexible Pick-Up & Drop-Off — Workshop Checklist
        </h3>
        <ChevronDown
          className={`w-6 h-6 text-teal-600 transition-transform duration-300 ${
            isMainExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded content */}
      {isMainExpanded && (
        <div className="p-6 space-y-4 animate-in fade-in slide-in-from-top duration-300">
          {categories.map((category, idx) => (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full px-5 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ChevronRight
                    className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                      expandedCategories.has(category.id) ? "rotate-90" : ""
                    }`}
                  />
                  <span className="font-semibold text-lg text-gray-900">{category.title}</span>
                </div>
              </button>

              {/* Category items */}
              {expandedCategories.has(category.id) && (
                <div className="bg-white divide-y divide-gray-100">
                  {category.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                        {item.label}
                      </span>
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedItems.has(item.id)
                            ? "bg-teal-500 border-teal-500 scale-110"
                            : "border-gray-300 group-hover:border-teal-400"
                        }`}
                      >
                        {selectedItems.has(item.id) && (
                          <Check className="w-4 h-4 text-white animate-in zoom-in duration-200" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Summary bar */}
          <div className="mt-6 p-5 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border-2 border-gray-200">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900 mb-2">
                Price: $800 per month — up to 2,000 rentals
              </p>
              <p className="text-sm text-gray-600">
                All items are optional. Select the steps you want to include in your renter flow.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
