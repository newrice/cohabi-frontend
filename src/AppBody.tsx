import React, { Fragment, useEffect, useState } from "react";
import Amplify from "aws-amplify";
import cognitoConfig from "./settings/auth-settings";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { cloneDeep } from "lodash";
import ChangePassword from "./auth/ChangePassword";
import SignOut from "./auth/SignOut";
import { ICurrentUser, IGroup, IUser } from "./types";
import { createGroup, fetchMe, updateGroup, updateProfile } from "./api";
import ChangeUserName from "./auth/ChangeUserName";
import AddGroup from "./groups/AddGroup";
import GroupList from "./groups/GroupList";

Amplify.configure(cognitoConfig);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<ICurrentUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [group, setGroup] = useState<IGroup | null>(null);
  useEffect(() => {
    console.log("app body use effect");
    onAuthUIStateChange((nextAuthState, authData) => {
      console.log("auth state change", nextAuthState, authData);
      setAuthState(nextAuthState);
      // setUser(authData)
    });
  }, []);
  useEffect(() => {
    const cleanup = () => {
      setUser(null);
      setUsers([]);
      setGroup(null);
    };
    if (authState === AuthState.SignedIn) {
      const whoami = async () => {
        const me = {
          body: {
            id: "aaa",
            name: "test.user1",
            groups: [],
            email: "",
            avatar: "",
          },
          result: { error: false, message: "" },
        }; //await fetchMe();
        if (me.body && !me.result.error) {
          setUser(me.body);
        } else {
          cleanup();
        }
      };
      whoami();
    } else {
      cleanup();
    }
  }, [authState]);
  useEffect(() => {
    const cleanup = () => {
      setUsers([]);
    };
    if (authState === AuthState.SignedIn) {
      const whoami = async () => {
        // const group = await fetchGroups();
        // if (me.body && !me.result.error) {
        //   setUser(me.body);
        // } else {
        //   cleanup();
        // }
      };
      whoami();
    } else {
      cleanup();
    }
  }, [authState, group]);
  const handleSignout = () => {
    setAuthState(AuthState.SignedOut);
  };
  const handleChangeUserName = (name: string) => {
    if (user) {
      updateProfile({ id: user.id, name });
    }
  };
  const handleChangeCurrentGroup = (group: IGroup) => {
    setGroup(group);
  };
  const handleAddGroup = (name: string) => {
    createGroup({ name }).then(async (res) => {
      console.log("create group end", res, user);
      if (!res.result.error && user) {
        console.log("create group end inside if");
        const newUser = cloneDeep(user); // await fetchMe()
        newUser.groups.push({ id: "aaaa", name });
        setGroup({ id: "aaaa", name });
        setUser(newUser);
      }
    });
  };
  const handleChangeGroupName = (id: string, name: string) => {
    updateGroup({ name }, id);
  };
  const handleInviteUser = (id: string, userId: string) => {
    updateGroup({ add_user: [userId] }, id);
  };
  const handleExitGroup = (id: string) => {
    if (user) {
      updateGroup({ remove_user: [user.id] }, id);
    }
  };
  return authState === AuthState.SignedIn ? (
    <Fragment>
      <SignOut onSignOutSuccess={handleSignout} />
      <ChangePassword />
      {user && (
        <ChangeUserName name={user.name} onSubmit={handleChangeUserName} />
      )}
      <AddGroup name='' onSubmit={handleAddGroup} />
      {user && group && (
        <GroupList
          groups={user.groups}
          currentGroup={group}
          onChangeCurrentGroup={handleChangeCurrentGroup}
          onChangeSubmit={handleChangeGroupName}
          onInviteClick={handleInviteUser}
          onExitClick={handleExitGroup}
        />
      )}
      <hr />
      <h1>Content</h1>
      <h2>{`Current Group : ${group}`}</h2>
    </Fragment>
  ) : (
    <Fragment>
      <AmplifyAuthenticator>
        <AmplifySignIn slot='sign-in' />
        <AmplifySignUp
          slot='sign-up'
          formFields={[
            { type: "username" },
            { type: "password" },
            { type: "email" },
          ]}
        />
      </AmplifyAuthenticator>
    </Fragment>
  );
};
