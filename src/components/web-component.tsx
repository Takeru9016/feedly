import ReactDOM from "react-dom";

import Widget from "./Widget";
import { normalizeAttribute } from "../utils";

class WidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes();
    ReactDOM.render(<Widget {...props} projectId={1} />, this.shadowRoot);
  }

  getPropsFromAttributes() {
    const props: Record<string, string> = {};
    for (const { name, value } of this.attributes) {
      props[normalizeAttribute(name)] = value;
    }
    return props;
  }
}

export default WidgetWebComponent;
