import { Suspense } from "react"

import Image from "next/image"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchBar from "@modules/layout/components/search-bar"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center w-full h-full text-small-regular">
          {/* Left: Side menu + Logo */}
          <div className="flex-1 basis-0 h-full flex items-center gap-x-3">

            <LocalizedClientLink
              href="/"
              className="hover:text-ui-fg-base flex items-center"
              data-testid="nav-store-link"
            >
              <Image
                src="/images/logo_farma_azul.png"
                alt="Farma Azul"
                width={140}
                height={28}
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* Center: Search bar (prepared for Meilisearch) */}
          <div className="flex-1 basis-0 flex justify-center">
            {/* hidden on very small screens; visible from `small` and up */}
            <SearchBar />
          </div>

          <div className="h-full">
            <SideMenu regions={regions} />
          </div>
          {/* Right: action buttons */}
          <div className="flex items-center gap-x-4 h-full flex-1 basis-0 justify-end">
            {/* WhatsApp */}
            <LocalizedClientLink
              href={(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "").length ? `https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER as string).replace(/\D/g, "")}` : "https://wa.me/"}
              className="hidden small:flex items-center gap-2 hover:text-ui-fg-base"
              aria-label="WhatsApp"
              title="WhatsApp"
> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 0 5.373 0 12c0 2.115.55 4.1 1.515 5.82L0 24l6.36-1.665A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.204-1.248-6.204-3.48-8.52zM12 22a9.94 9.94 0 01-5.07-1.38l-.36-.21-3.78.99 1.01-3.69-.24-.39A10 10 0 1122 12c0 5.514-4.486 10-10 10zm5.06-7.21c-.28-.14-1.64-.81-1.9-.9-.26-.1-.45-.14-.64.14-.19.28-.74.9-.9 1.08-.17.19-.33.21-.61.07-.28-.14-1.19-.44-2.27-1.41-.84-.75-1.41-1.67-1.58-1.95-.17-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.1-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.49.07-.75.35-.26.28-1 1-1 2.44s1.03 2.84 1.18 3.03c.14.19 2.03 3.1 4.92 4.34.69.3 1.22.48 1.64.61.69.22 1.33.19 1.83.12.56-.08 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32-.07-.11-.26-.18-.54-.32z" />
              </svg>
            </LocalizedClientLink>

            {/* Favorites */}
            <LocalizedClientLink
              href="/wishlist"
              className="hidden small:flex items-center gap-2 hover:text-ui-fg-base"
              aria-label="Favoritos"
              title="Favoritos"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
              </svg>
            </LocalizedClientLink>

            {/* Cart */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex items-center gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <circle cx="9" cy="20" r="1.5" />
                    <circle cx="17" cy="20" r="1.5" />
                    <path d="M5 4h2l3 12h8l2-8H7" />
                  </svg>
                  <span>Cart (0)</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            {/* Iniciar sesión */}
            <div className="hidden small:flex items-center h-full">
              <LocalizedClientLink
                className="bg-[#1d4495] text-white px-3 py-1.5 rounded-md hover:opacity-90"
                href="/account"
                data-testid="nav-account-link"
              >
                Iniciar sesión
              </LocalizedClientLink>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
