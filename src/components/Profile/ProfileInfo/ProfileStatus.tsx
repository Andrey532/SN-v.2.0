import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css";

type ProfileStatusType = {
  status: string
  updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {
  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }

  deActivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateStatus(this.state.status)
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div>
        {
          !this.state.editMode
            ? <div ><span
              onDoubleClick={this.activateEditMode}>{this.props.status || "-------"}</span></div>
            : <div><input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode}
                          value={this.state.status}/></div>
        }
      </div>
    );
  }
}
