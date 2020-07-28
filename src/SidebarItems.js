import React from 'react';
import { Accordion, Menu } from 'semantic-ui-react';



class SidebarItems extends React.Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state;
        var i = 0;
        return (
            <Accordion as={Menu} vertical secondary fluid exclusive={false} className="global-left-nav">
                {this.props.config.map(((cfg) => {
                    i++;
                    return (
                    <Menu.Item position='left'>
                        <Accordion.Title
                            active={activeIndex === i}
                            content={<span>{cfg.title}</span>}
                            index={i}
                            onClick={this.handleClick}
                            left
                        />
                        {cfg.items && 
                            <Accordion.Content active={activeIndex === i}>
                                {cfg.items.map(((item) => {
                                    return (
                                        <Menu.Item>{item}</Menu.Item>
                                    );
                                }))}
                            </Accordion.Content>
                        }
                    </Menu.Item>
                    );
                }))}
            </Accordion>
        );

    }
}

export default SidebarItems;
