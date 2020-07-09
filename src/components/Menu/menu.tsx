import React, {createContext, useState} from "react";
import classNames from "classnames";
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical' // 字符串字面量
type SelectCallback = (selectedIndex: number) => void

export interface MenuProps{
    className?: string;
    defaultIndex?: number;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}

interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
    mode?: MenuMode;
}
export const MenuContext = createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = (props) => {
    const {className, defaultIndex, mode, style, onSelect, children} = props
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    const handleClick = (index: number) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick,
        mode: mode
    }

    /**
     * 实现Menu的子组件只允许是MenuItem，同时，MenuItem的index属性可选。
     * 使用技术：React.Children.map、displayName和React.cloneElement
     * 返回新的子组件。
     */
    const renderChildren = () => {
        return React.Children.map(children, ((child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps> // 类型断言，child为组件实例
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') { // 只返回子组件是MenuItem的children。
                return React.cloneElement(childElement, {index}) // 使用React.cloneElement给原有MenuItem组件添加index属性，这样用户就不用写index属性了。
            } else { // 如果子组件不是MenuItem，则输出错误信息。
                console.error('Waring: Menu has a child which is not a MenuItem component!')
            }
        }))
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    mode: "horizontal",
    defaultIndex: 0
}

export default Menu
