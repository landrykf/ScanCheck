import React from "react";

export const Computer = () => {
  return (
    <div id="computer">
      <div class="container">
        <div class="screen monitor">
          <div class="content">
            <div class="pg">
              <ul class="btns">
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <ul class="txt">
                <li></li>
                <li></li>
                <li class="thin"></li>
                <li class="thin"></li>
                <li class="thin"></li>
              </ul>
            </div>
          </div>
          <div class="base">
            <div class="grey-shadow"></div>
            <div class="foot top"></div>
            <div class="foot bottom"></div>
            <div class="shadow"></div>
            <div class="keyboard">
              <div class="btm"></div>
              <ul class="keys">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div class="shadow"></div>
            </div>
          </div>
        </div>
        <div class="laptop">
          <div class="content">
            <ul class="txt txt-laptop">
              <li></li>
              <li></li>
              <li class="thin"></li>
              <li class="thin"></li>
              <li class="thin"></li>
            </ul>
          </div>
          <div class="btm"></div>
          <div class="shadow"></div>
        </div>
        <div class="phone">
          <div class="screen">
            <div class="content">
              <ul class="txt">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>

          <div class="shadow"></div>
        </div>
      </div>
    </div>
  );
};
