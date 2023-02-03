import React, { useEffect, useRef, useState } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { Api } from "app/model/api";
// import { getUser } from "~selectors/userSelectors";
// import useEventListener from "~shared/hooks/useEvents";
// import { AppActions } from "./actions/appActions";

export const ConnectAPI: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const progressRef = useRef<LoadingBarRef>({});

  const [progress, _setProgress] = useState(0);
  const [networkRequestThread, setNetworkRequestThread] = useState<
    NodeJS.Timeout | string
  >("");

  // const user = useSelector((state) => getUser(state));
  const user = { token: "123", isLoggedIn: true };

  const setProgress = (val: number) => {
    if (!user) _setProgress(0);
    else _setProgress(val);
  };

  const dispatch = useDispatch();

  // const { syncKanbanBoardsData } = AppActions(dispatch);

  // useEventListener("user.logout", () => {
  //   window.clearTimeout(networkRequestThread);
  // });

  useEffect(() => {
    console.log("Init api...");

    if (!user || !user.token || !user.isLoggedIn) {
      setProgress(0);
      window.clearTimeout(networkRequestThread);
      return;
    }

    const _networkRequestThread = setTimeout(() => {
      fetchNecessaryData();
    }, 10);
    setNetworkRequestThread(_networkRequestThread);

    return () => {
      window.clearTimeout(networkRequestThread);
    };
  }, []);

  const fetchNecessaryData = async () => {
    console.log("Fetching necessary data...");
    const { categories } = (await Api.Categories.getCategories()) || {};
    console.log(categories);

    setProgress(100);
  };

  return (
    <>
      <LoadingBar
        //   ref={progressRef}
        progress={progress}
        height={progress === 0 ? 0 : 3}
        color="#FE753F"
        onLoaderFinished={() => {
          setProgress(0);
        }}
      />
      {children}
    </>
  );
};
