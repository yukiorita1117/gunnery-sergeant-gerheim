// TODO create のため。一旦雛形状態。
// sqlとの通信になるのでstoreでfetchingの状態を管理する。

import React from "react";
import styled from "styled-components";
import axios from "axios";
// import { requestData, receiveDataSuccess, receiveDataFailed } from "../actions";

const InputForm = ({ store }) => {
  const isFetching = false; //仮
  //   const { isFetching, resultArray } = store.getState().fetchData;

  const handleFetchData = () => {
    // store.dispatch(requestData()); // axios.get()を呼ぶ前にisFetchingをtrueに！
    axios
      .get("/api/create")
      .then((res) => {
        // データ受け取りに成功
        console.log("ブラウザ側で受け取れている？", res);
        // const _resultArray = response.data;
        // store.dispatch(receiveDataSuccess(_resultArray)); // データをstoreに保存するとともにisFetchingをfalseに
      })
      .catch((err) => {
        console.error(new Error(err));
        // store.dispatch(receiveDataFailed()); // isFetchingをfalseに
      });
  };

  const Wrapper = styled.div`
    margin-top: 32px;
  `;

  const Item = styled.li`
    list-style: none;
  `;

  return (
    <Wrapper>
      {isFetching ? (
        // データをFetch中ならばローディングを表示
        <h2>Now Loading...</h2>
      ) : (
        <div>
          <button onClick={() => handleFetchData()}>fetch data</button>
          <ul>
            {/* {resultArray.map((result) => (
                <Item key={result.id}>{`${result.inputText}`}</Item>
              ))} */}
          </ul>
        </div>
      )}
    </Wrapper>
  );
};

export default InputForm;
