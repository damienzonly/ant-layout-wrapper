import React from "react";
import { Layout as AntLayout } from "antd";

const { Sider, Footer, Content } = AntLayout;

interface ILayoutProps {
    rootLayoutProps?: any;
    innerLayoutProps?: any;

    siderProps?: any;
    headerProps?: any;
    footerProps?: any;
    contentProps?: any;

    siderWrapperProps?: any;
    footerWrapperProps?: any;
    contenWrappertProps?: any;

    HeaderComponent?: any;
    ContentComponent?: any;
    SiderComponent?: any;
    FooterComponent?: any;
}

export default class Layout extends React.Component<ILayoutProps> {
    state = { collapsed: false };
    toggleCollapse = () => this.setState({ collapsed: !this.state.collapsed });

    getSider = () => {
        const { SiderComponent } = this.props;
        if (!SiderComponent) return null;
        const collapsible = true;
        const onCollapse = this.toggleCollapse;
        const collapsed = this.state.collapsed;
        const style = { minHeight: "100vh" };
        const opts = { style, collapsible, onCollapse, collapsed, ...this.props.siderWrapperProps };
        return (
            <Sider {...opts}>
                <SiderComponent {...this.props.siderProps} />
            </Sider>
        );
    };

    getHeader = () => {
        const { HeaderComponent } = this.props;
        if (!HeaderComponent) return null;
        return <HeaderComponent {...this.props.headerProps} />;
    };

    getFooter = () => {
        const { FooterComponent } = this.props;
        if (!FooterComponent) return null;
        const style = { marginTop: "auto", padding: "14px 50px" };
        const opts = { style, ...this.props.footerWrapperProps };
        return (
            <Footer {...opts}>
                <FooterComponent {...this.props.footerProps} />
            </Footer>
        );
    };

    getContent = () => {
        const { ContentComponent } = this.props;
        if (!ContentComponent) return null;
        const style = { padding: "50px 50px 0 50px", height: "100%", width: "100%" };
        const opts = { style, ...this.props.contenWrappertProps };
        return (
            <Content {...opts}>
                {" "}
                <ContentComponent {...this.props.contentProps} />{" "}
            </Content>
        );
    };

    render() {
        const innerLayoutStyle = { minHeight: "100vh" };
        const props = this.props;
        return (
            <AntLayout {...props.rootLayoutProps}>
                {this.getSider()}
                <AntLayout {...props.innerLayoutProps} style={innerLayoutStyle}>
                    {this.getHeader()}
                    {this.getContent()}
                    {this.getFooter()}
                </AntLayout>
            </AntLayout>
        );
    }
}
