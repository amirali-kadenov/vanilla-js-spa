import { ButtonLink } from '@/shared/ui/button/button.mjs'

/**
 * @typedef {Object} NavLinkProps
 * @property {string} children
 * @property {string} href
 */

/**
 * @param {NavLinkProps} props
 */
export const NavLink = (props) => {
  const isActive = window.location.pathname === props.href

  return ButtonLink({
    children: props.children,
    href: props.href,
    variant: isActive ? ButtonLink.Variants.PRIMARY : ButtonLink.Variants.CLEAR,
    className: 'dashboard__link',
  })
}
