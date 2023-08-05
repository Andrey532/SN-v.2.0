import "./App.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "./redux/store";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Route, Routes} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import React, {ComponentType, Suspense} from "react";
import {initializeAppThunk} from "./redux/AppReducer";
import {LoginContainer} from "./components/Login/login";
import {Settings} from "./components/Settings/Settings";
import {withRouter} from "./components/common/Hooks/withRouter";
import {UsersContainer} from "./components/Users/UsersContainer";
import {Preloader} from "./components/common/Preloader/Preloader";
import {HeaderContainer} from "./components/Header/HeaderContainer";

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