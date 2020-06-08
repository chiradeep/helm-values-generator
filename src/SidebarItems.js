import React from 'react';
import { Menu } from 'semantic-ui-react';



class SidebarItems extends React.Component {
  render() {
        return (
          <>
          {this.props.items.map(((item) => {
            return (
              <Menu.Item as='a' key={item} onClick={(e) => this.props.onClick(item, e)}>
                {item} 
              </Menu.Item>
            );
          }))}
          </>
        );
          
  }
}

export default SidebarItems;
