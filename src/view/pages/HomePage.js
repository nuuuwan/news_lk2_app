import { Component } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import { TimeX } from "@nuuuwan/utils-js-dev";

import ArticleSummary from "../../nonview/core/ArticleSummary";

import URLContext from "../../nonview/base/URLContext"
import HomePageBottomNavigation from "../../view/molecules/HomePageBottomNavigation";
import ArticleView from "../../view/organisms/ArticleView";
import I18N from "../../nonview/base/I18N"

const STYLE = {
  margin: 2,
  marginTop: 2,
  marginBottom: 2,
};

const MAX_ARTICLES_TO_DISPLAY = 100;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = this.getContext();
    this.state = { articleSummaryList: null, timeLatestRefresh: null };
    this.setContext(context);
  }

  getContext() {
    let context = URLContext.getContext();
    if (!context.lang) {
      context.lang = I18N.getLang();
    }
    return context;
  }

  setContext(context) {
    URLContext.setContext(context);
    I18N.setLang(context.lang);
  }

  async refreshData() {
    const articleSummaryList = await ArticleSummary.loadArticleSummaryList();
    const timeLatestRefresh = TimeX.getUnixTime();
    this.setState({
      articleSummaryList,
      timeLatestRefresh,
    });
  }

  async componentDidMount() {
    await this.refreshData();
  }

  async onClickRefresh() {
    await this.refreshData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    const { articleSummaryList, timeLatestRefresh } = this.state;
    if (!articleSummaryList) {
      return <CircularProgress />;
    }

    const articleSummaryListToDisplay = articleSummaryList.splice(
      0,
      MAX_ARTICLES_TO_DISPLAY
    );
    return (
      <Box sx={STYLE}>
        <Stack key={"articles-" + timeLatestRefresh} spacing={2}>
          {articleSummaryListToDisplay.map(function (articleSummary) {
            const fileName = articleSummary.fileName;
            return (
              <ArticleView
                key={"article-" + fileName}
                articleSummary={articleSummary}
              />
            );
          })}
        </Stack>
        <HomePageBottomNavigation
          timeLatestRefresh={timeLatestRefresh}
          onClickRefresh={this.onClickRefresh.bind(this)}
        />
      </Box>
    );
  }
}
