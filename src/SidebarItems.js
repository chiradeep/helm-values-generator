import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class SidebarItems extends React.Component {
  render() {
        return (
          <div>
          {this.props.items.map(((item) => {
            return (
              <ListItem key={item} button onClick={(e) => this.props.onClick(item, e)}>
                <ListItemText primary={item} />
              </ListItem>
            );
          }))}
          </div>
        );
          
  }
}

export default SidebarItems;