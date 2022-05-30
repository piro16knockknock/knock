import React from "react";

const MyHomeDetail = (props) => {
  return (
    <section class="myhome-detail">
      <div>
        <div class="myhome-info">
          <p class="myhome-detail__title">집 정보</p>
          <hr />
          <p class="myhome-detail__row">
            <label>현재 집이름</label>
            <span id="myhome-info__current-home-name">home_name</span>
          </p>
          <p class="myhome-detail__row">
            <label>집이름 변경</label>
            <input
              type="text"
              id="new-home-name"
              placeholder="변경할 집 이름을 입력하세요."
              maxlength="20"
            />
            <button
              type="button"
              onclick="onClickCheckHomeName()"
              class="myhome-detail__btn ms-2"
            >
              중복 확인
            </button>
            <span id="myhome-detail-alert" class="ms-2"></span>
          </p>
          <p class="myhome-detail__row">
            <div class="myhome-detail__row__flex_row">
              <label>전세/월세</label>
              <div class="myhome-info__rent-or-utility">
                <label class="myhome-info__radio-btn">
                  <input type="radio" name="item" value="전세" />
                </label>
                {/* // onclick="onSelectUtilityOrRent(event)" {% if not is_rent %}checked{% endif %}><span>전세</span></label> */}
                <label class="myhome-info__radio-btn">
                  <input id="myhome-info__rent-checked" type="radio" />
                </label>
                {/* // name="item" onclick="onSelectUtilityOrRent(event)" value="월세" {% if is_rent %}checked{% endif %}><span>월세</span></label> */}
              </div>
            </div>
          </p>
          {/* <!-- 전세일 때 월세 블록 자체를 없애면 다른 많은 부분을 예외처리 해줘야하기 때문에 display:none css를 사용함 --> */}
          <p class="myhome-detail__row myhome-detail__row__rent {% if not is_rent %}myhome-detail__display-none{% endif %}">
            <label>월세 납부일</label>
            <input
              type="number"
              id="new-rent-month"
              value="{{ rent_month }}"
              min="1"
              max="12"
            />
            <span>개월마다</span>
            <input
              type="number"
              id="new-rent-date"
              value="{{ rent_date }}"
              min="1"
              max="31"
            />
            <span>일</span>
          </p>
          <p class="myhome-detail__row">
            <div class="myhome-detail__row__flex_row">
              <label>공과금 납부일</label>
              <div class="myhome-detail__row__utility">
                <ul class="myhome-detail__row__utility-ul">
                  <p>※ 최대 10개까지 설정 가능합니다.</p>
                  {/* {% for utility in utilities %} */}
                  <li class="myhome-detail__row__rent myhome-detail__row__utility-li">
                    <div class="myhome-detail__row__rent-type">
                      <span>종류</span>
                      <input
                        class="new-utility-name"
                        value="{{ utility.name }}"
                        name="utility_name"
                        type="text"
                        maxlength="10"
                      />
                    </div>
                    <input
                      type="number"
                      class="new-utility-month"
                      value="{{ utility.month }}"
                      min="1"
                      max="12"
                    />
                    <span>개월마다</span>
                    <input
                      type="number"
                      class="new-utility-date"
                      value="{{ utility.date }}"
                      min="1"
                      max="31"
                    />
                    <span>일</span>
                    <i
                      class="fas fa-minus-square"
                      onclick="deleteUtility(this)"
                    ></i>
                  </li>
                  {/* {% endfor %} */}
                </ul>
                {/* {% if utilities|length < 5 %} */}
                {/* <!--공과금 추가 버튼--> */}
                <i
                  class="fas fa-plus-circle myhome-detail__row__add-utility"
                  onclick="addUtility(this)"
                  class="fas fa-plus-circle"
                ></i>
                {/* {% endif %} */}
              </div>
            </div>
          </p>
          <button
            type="submit"
            onclick='onClickSaveHome("{{ home_name }}")'
            class="myhome-detail__btn"
          >
            저장하기
          </button>
        </div>
        <div class="myhome-roommate">
          <p class="myhome-detail__title">룸메이트</p>
          <hr />
          <div class="myhome-roommate__row">
            {/* {% for roommate in roommates %} */}
            <div class="myhome-roommate__column">
              <a href="#">
                <img
                  class="cal-profile-img"
                  src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=301&q=80"
                />
              </a>

              <p>roommate.nick_name</p>
            </div>
            {/* {% endfor %} */}
            {/* <!--룸메이트 추가 버튼--> */}
            <div class="myhome-roommate__invite">
              <a data-bs-toggle="modal" data-bs-target="#roommateAddModal">
                <i class="fas fa-plus-circle"></i>
              </a>
            </div>
            {/* <!-- Modal --> */}
            <div
              class="modal fade"
              id="roommateAddModal"
              tabindex="-1"
              aria-labelledby="roommateAddModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title myhome-roommate__modal-font"
                      id="roommateAddModalLabel"
                    >
                      룸메이트 초대
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <nav>
                    <ul class="nav nav-pills" id="nav-tab" role="tablist">
                      <li class="tab-nav-item ms-3">
                        <button
                          class="nav-link active fs-4"
                          data-bs-toggle="tab"
                          data-bs-target="#roommate-search-tab"
                          type="button"
                          aria-selected="true"
                        >
                          직접 검색
                        </button>
                      </li>
                      <li class="tab-nav-item">
                        <button
                          class="nav-link fs-4"
                          data-bs-toggle="tab"
                          data-bs-target="#roommate-link-tab"
                          type="button"
                          aria-selected="false"
                        >
                          초대 링크
                        </button>
                      </li>
                    </ul>
                  </nav>
                  <div class="tab-content">
                    <div
                      id="roommate-search-tab"
                      class="modal-body tab-pane fade show active"
                    >
                      <div class="myhome-roommate__modal-input">
                        <input
                          type="text"
                          id="myhome-roommate-invite__input"
                          placeholder="등록할 룸메이트의 아이디를 입력하세요."
                        />
                      </div>
                      <div class="form-check">
                        {/* <!--유저 검색 결과 리스트가 나타날 곳--> */}
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary myhome-roommate__modal-font"
                          data-bs-dismiss="modal"
                        >
                          닫기
                        </button>
                        <button
                          type="button"
                          onclick="onClickInvite()"
                          class="btn-green btn myhome-roommate__modal-font"
                          data-bs-dismiss="modal"
                        >
                          룸메이트 초대
                        </button>
                        {/* <!--ajax로 초대 구현--> */}
                      </div>
                    </div>
                    <div
                      id="roommate-link-tab"
                      class="modal-body tab-pane fade"
                    >
                      <div class="myhome-roommate__modal-input mb-4">
                        <input
                          type="text"
                          id="myhome-roommate-link__input"
                          value="{{request.user.home.pk}}/{{ request.user.home.invite_link }}"
                        />
                        <i
                          id="roommate-invite-url-copy"
                          class="far fa-copy"
                        ></i>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary myhome-roommate__modal-font"
                          data-bs-dismiss="modal"
                        >
                          닫기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyHomeDetail;
