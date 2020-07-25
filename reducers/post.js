import shortid from "shortid";

//서버개발자와 합의를 봐야할 부분들
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "yzzzzun"
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          id: shortid.generate(),
          src: "https://gimg.gilbut.co.kr/book/BN002496/rn_view_BN002496.jpg"
        },
        {
          id: shortid.generate(),
          src: "https://gimg.gilbut.co.kr/book/BN002496/rn_view_BN002496.jpg"
        },
        {
          id: shortid.generate(),
          src: "https://gimg.gilbut.co.kr/book/BN002496/rn_view_BN002496.jpg"
        }
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: "hero"
          },
          content: "저거 내꺼"
        },
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: "zeze"
          },
          content: "키듴키듴"
        }
      ]
    }
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = data => ({ type: ADD_POST_REQUEST, data });

export const addComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data
});

const dummyPost = data => ({
  id: data.id,
  User: {
    id: 1,
    nickname: "yzzzzun"
  },
  content: data.content,
  Images: [],
  Comments: []
});

const dummyComment = data => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "yzzzzun"
  }
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostError: action.error
      };

    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null
      };

    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter(v => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        removePostLoading: false,
        removePostError: action.error
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null
      };

    case ADD_COMMENT_SUCCESS:
      const postIndex = state.mainPosts.findIndex(
        v => v.id === action.data.postId
      );

      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error
      };
    default:
      return state;
  }
};

export default reducer;
