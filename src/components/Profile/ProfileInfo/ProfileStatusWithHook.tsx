import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusWithHookType = {
  status: string
  updateStatus: (status: string) => void
}

export const ProfileStatusWithHook = (props: ProfileStatusWithHookType) => {

  const [editMode, setEditMode] = useState(false)

  const [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deActivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode
        ? <div><span onDoubleClick={activateEditMode}>{props.status || "-------"}</span></div>
        : <div><input onChange={onStatusChange} autoFocus={true} onBlur={deActivateEditMode} value={status}/></div>}
    </div>
  );
}

