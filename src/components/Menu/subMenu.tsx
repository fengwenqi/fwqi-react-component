import React, {useContext, useState, FunctionComponentElement} from "react";
import classNames from "classnames";
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
    index?: number;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = function ({index, title, className, children}) {
    const [menuOpen, setMenuOpen] = useState(false)
    const context = useContext(MenuContext)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }

    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        // 防抖处理
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300)
    }

    // 垂直模式，点击打开或关闭subMenu
    const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}
    // 水平模式，mouseenter打开subMenu，mouseleave关闭subMenu
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent =  React.Children.map(children, ((child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return childElement
            } else {
                console.log('Waring: SubMenu has a child which is not a MenuItem component!')
            }
        }))
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>{title}</div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
