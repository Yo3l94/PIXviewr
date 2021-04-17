import { Component } from "react";
import ReactDOM from "react-dom";

const portalRoot = document.getElementById("portal");

export default class Portal extends Component {
  constructor(props: any) {
    super(props);
    //@ts-ignore
    this.el = document.createElement("div");
  }

  componentDidMount = () => {
    //@ts-ignore
    portalRoot.appendChild(this.el);
  };

  componentWillUnmount = () => {
    //@ts-ignore
    portalRoot.removeChild(this.el);
  };

  render() {
    const { children } = this.props;
    //@ts-ignore
    return ReactDOM.createPortal(children, this.el);
  }
}
