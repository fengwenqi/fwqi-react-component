import React from "react";
import {fireEvent, render} from '@testing-library/react'
import Button, {ButtonProps, ButtonSize, ButtonType} from "./button";

const defaultProps = {
    onClick: jest.fn() // 创建一个被监控的模拟函数
}

const testProps: ButtonProps = {
    className: 'k-class',
    size: ButtonSize.Large,
    btnType: ButtonType.Primary
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

/**
 * describe: 给测试用例分组
 */
describe('test Button component', () => {
    // it同test，都是测试用例， expect：断言
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Hello</Button>) // 得到真实Dom
        const element = wrapper.getByText('Hello') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element) // 模拟button上触发点击事件
        expect(defaultProps.onClick).toHaveBeenCalled()
    })

    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Hello</Button>) // 得到真实Dom
        const element = wrapper.getByText('Hello')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn k-class btn-primary btn-lg')
    })

    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href="http://www.baidu.com">Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })

    it('should render a disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Hello</Button>) // 得到真实Dom
        const element = wrapper.getByText('Hello') as HTMLButtonElement // 使用断言（我比机器更懂，这里就是button）
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})
