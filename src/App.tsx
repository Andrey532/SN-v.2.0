import "./App.css";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Route, Routes} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import {Settings} from "./components/Settings/Settings";
import {UsersContainer} from "./components/Users/UsersContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {LoginContainer} from "./components/Login/login";
import React, {ComponentType, Suspense} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "./components/common/Hooks/withRouter";
import {initializeAppThunk} from "./redux/AppReducer";
import {AppStateType} from "./redux/store";
import {Preloader} from "./components/common/Preloader/Preloader";

//import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
//import {ProfileContainer} from "./components/Profile/ProfileContainer";
const DialogsContainer = React.lazy(() => import ("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"));

class App extends React.Component<AppClassType> {
  componentDidMount() {
    this.props.initializeAppThunk()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer/>
        <Navbar/>
        <div className="app-wrapper-content">
          <Suspense fallback={<div><Preloader/></div>}>
            <Routes>
              <Route path="profile/:userId?" element={<ProfileContainer/>}/>
              <Route path="users" element={<UsersContainer/>}/>
              <Route path="dialogs/*" element={<DialogsContainer/>}/>
              <Route path="music" element={<Music/>}/>
              <Route path="news" element={<News/>}/>
              <Route path="settings" element={<Settings/>}/>
              <Route path="login" element={<LoginContainer/>}/>
            </Routes>
          </Suspense>
        </div>
      </div>
    )
  };
}

export type AppClassType = MapToStatePropsType & MapDispatchToPropsType;

type MapDispatchToPropsType = {
  initializeAppThunk: () => void
}

type MapToStatePropsType = {
  initialized: boolean
}

const MapToStateProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default compose<ComponentType>(
  withRouter,
  connect(MapToStateProps, {initializeAppThunk}))(App)