import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={(e) => {e.preventDefault(); alert('aaa')}}>Default Button</Button>
        <Button btnType={ButtonType.Primary}>Primary Button</Button>
        <Button btnType={ButtonType.Danger}>Danger Button</Button>
        <Button autoFocus size={ButtonSize.Small}>Small Button</Button>
        <Button size={ButtonSize.Large}>Large Button</Button>
        <Button disabled={true}>Disabled Button</Button>
        <Button btnType={ButtonType.Link} href={'http://www.baidu.com'} target="_blank">Baidu Link</Button>
        <Button disabled={true} btnType={ButtonType.Link} href={'http://www.baidu.com'}>Disabled Link</Button>

        <Menu onSelect={(index) => {alert(index)}} mode="vertical">
          <MenuItem>menu item 1</MenuItem>
          <MenuItem>menu item 2</MenuItem>
          <MenuItem>menu item 3</MenuItem>
          <SubMenu title={'submenu'}>
            <MenuItem>submenu item 1</MenuItem>
            <MenuItem>submenu item 2</MenuItem>
            <MenuItem>submenu item 3</MenuItem>
          </SubMenu>
          <MenuItem>menu item 4</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
