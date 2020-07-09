import React from "react";
import {render, RenderResult, fireEvent, cleanup} from "@testing-library/react";
import Menu, {MenuProps} from "./menu";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: 0,
    mode: "vertical"
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>xyz</MenuItem>
        </Menu>
    )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
    beforeEach(() => { // 后面所有的用例都可以共享
        wrapper = render(generateMenu(testProps))
        menuElement = wrapper.getByTestId('test-menu') // 通过testid获取元素
        activeElement = wrapper.getByText('active') // 通过文本拿到元素
        disabledElement = wrapper.getByText('disabled')
    })

    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('menu', 'test')
        expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(activeElement).toHaveClass('menu-item', 'is-active')
        expect(disabledElement).toHaveClass('menu-item', 'is-disabled')
    })

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem) // 模拟menu item上触发点击事件
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith(2)
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
    })

    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        wrapper = render(generateMenu(testVerProps))
        menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
})
