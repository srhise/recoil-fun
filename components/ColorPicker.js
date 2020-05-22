import React from "react";
import { SketchPicker } from "react-color";

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  };
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };
  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };
  handleChange = (color) => {
    this.props.onChange(color.hex);
  };
  render() {
    const { color } = this.props;
    return (
      <div>
        <div className="swatch flex" onClick={this.handleClick}>
          <div className="color" />
        </div>
        {this.state.displayColorPicker ? (
          <div className="popover">
            <div className="cover" onClick={this.handleClose} />
            <SketchPicker color={color} onChange={this.handleChange} />
          </div>
        ) : null}
        <style jsx>{`
          .swatch {
            width: 40px;
            height: 30px;
            background: #fff;
            border-radius: 1px;
            box-shadow: 0 0 0 1px rgba(0,0,0,.1);
            cursor: pointer;
            padding: 5px;
          }
          .color {
            border-radius: 2px;
            flex: 1;
            background: ${color};
          }
          .popover {
            position: absolute;
            z-index: 2;
            right:0px;

          }
          .cover {
            position: absolute;
            z-index: 0;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
          },
    `}</style>
      </div>
    );
  }
}

export default ColorPicker;
