import React from 'react';
import { Accordion, Menu, Header } from 'semantic-ui-react';



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
            <Accordion as={Menu} vertical secondary fluid exclusive={false}>
                {this.props.config.map(((cfg) => {
                    i++;
                    return (
                    <Menu.Item position='left'>
                        <Accordion.Title
                            active={activeIndex === i}
                            content={<Header as='h4'>{cfg.title}</Header>}
                            index={i}
                            onClick={this.handleClick}
                            left
                        />
                        {cfg.items.map(((item) => {
                            return (
                                <Accordion.Content active={activeIndex === i} content={item} />
                            );
                        }))}
                    </Menu.Item>
                    );
                }))}
            </Accordion>
        );

    }
}

export default SidebarItems;
