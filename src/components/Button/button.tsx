import React from "react";
import classNames from "classnames";

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary= 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string
}
// 定义类型别名
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// 将所有属性变成可选属性，这样避免button和anchor部分属性不一样的问题。
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
    const {className, size, btnType, disabled, children, href, ...restProps} = props
    // btn, btn-lg, btn-primary
    const classes = classNames('btn', className, {
        [`btn-${size}`]: size,
        [`btn-${btnType}`]: btnType,
        'disabled': btnType === ButtonType.Link && disabled
    })

    if (btnType === ButtonType.Link && href) {
        return (
            <a className={classes} href={href} {...restProps}>
                {children}
            </a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled} {...restProps}>
                {children}
            </button>
        )
    }
}
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button
