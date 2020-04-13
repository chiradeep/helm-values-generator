import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';

const items = ['Citrix ADC in Tier 1', 'Citrix ADC CPX in Tier 2', 'Citrix ADC as Istio Ingress Gateway', 'Citrix ADC CPX as Istio Sidecar'];


class SidebarItems extends React.Component {
  render() {
        return (
          <div>
          {items.map(((item) => {
            return (
              <ListItem button onClick={(e) => this.props.onClick(item, e)}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
            );
          }))}
          </div>
        );
          
  }
}

export default SidebarItems;