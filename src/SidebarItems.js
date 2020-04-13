import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';


class SidebarItems extends React.Component {
  render() {
        return (
          <div>
          {this.props.items.map(((item) => {
            return (
              <ListItem button onClick={(e) => this.props.onClick(item, e)}>

              <ListItemText primary={item} />
            </ListItem>
            );
          }))}
          </div>
        );
          
  }
}

export default SidebarItems;