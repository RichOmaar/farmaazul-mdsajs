"use client"

import { useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"
import { Menu } from "@headlessui/react"

export default function SearchBar() {
  const params = useSearchParams()
  const initialQ = params?.get("q") || ""
  const initialCategory = params?.get("category") || "all"

  const [query, setQuery] = useState(initialQ)
  const [category, setCategory] = useState(initialCategory)

  const categories = [
    { id: "all", name: "Todas las categorias" },
    // Ready for future dynamic categories integration
    { id: "medicamentos", name: "Medicamentos" },
    { id: "cuidado-personal", name: "Cuidado personal" },
  ]

  const selectedCategory =
    categories.find((c) => c.id === category) || categories[0]

  const onSubmit = (e: FormEvent) => {
    // Keep it simple: GET /search?q=...&category=...
    if (!query.trim()) {
      // avoid empty searches for now
      e.preventDefault()
    }
  }

  return (
    <form
      action="/search"
      method="get"
      onSubmit={onSubmit}
      className="w-full max-w-xl hidden small:flex items-center"
      role="search"
      aria-label="Buscar productos"
    >
      <input type="hidden" name="category" value={category} />

      <div className="flex w-full items-center rounded-md border border-ui-border-base bg-white focus-within:ring-2 focus-within:ring-[#1d4495]">
        {/* Category dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button
            type="button"
            className="flex items-center gap-2 px-3 py-2 text-ui-fg-base hover:text-ui-fg-subtle whitespace-nowrap"
            aria-label="Seleccionar categoría"
            title="Seleccionar categoría"
          >
            <span className="truncate max-w-[9rem]">{selectedCategory.name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 text-ui-fg-muted"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </Menu.Button>
          <Menu.Items className="absolute z-10 mt-1 max-h-64 overflow-auto left-0 w-56 bg-white border border-ui-border-base rounded-md shadow-lg focus:outline-none">
            {categories.map((c) => (
              <Menu.Item key={c.id}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`${active ? "bg-gray-100" : ""} w-full text-left px-3 py-2 text-ui-fg-base`}
                  >
                    {c.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>

        {/* Visual separator as requested */}
        <span className="px-2 select-none text-gray-300">|</span>

        {/* Search input */}
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="flex-1 bg-transparent px-3 py-2 text-ui-fg-base placeholder:text-ui-fg-muted focus:outline-none"
          aria-label="Buscar productos"
        />

        {/* Submit button styled in blue */}
        <button
          type="submit"
          className="mr-1 my-1 inline-flex items-center gap-2 rounded-md bg-[#1d4495] px-3 py-2 text-white hover:opacity-90"
          aria-label="Buscar"
          title="Buscar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </form>
  )
}
