import React, { Component } from "react";
import "./App.css";
import Issue from './components/issue/issue';
import AdjustIcon from '@material-ui/icons/Adjust';
import DoneIcon from '@material-ui/icons/Done';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: [],
      urls: [],
      currentPage: 1
    }
  }

  async getIssues(url = "  https://api.github.com/repos/octocat/hello-world/issues") {
    const response = await fetch(url);
    const link = response.headers.get("Link");
    const links = link.split(",");
    const urls = links.map(a => {
      return {
        url: a.split(";")[0].replace("<", "").replace(">", ""),
        title: a.split(";")[1].slice(6, -1)
      }
    })
    const data = await response.json();
    this.setState({ issues: data, urls: urls })
    console.log(data)
    //console.log(link);
    console.log(urls);
    //console.log("state urls : " + this.state.urls);
  }

  checkTitle = (title, url) => {
    if (title === "prev") return "< Previous";
    else if (title === "next") return "Next >";
    else if (title === "first") return "First page";
    else if (title === "last") return "Last page";
    else return url.slice(url.indexOf("page=") + 5)
  }

  componentDidMount() {
    this.getIssues()
  }

  render() {
    return (
      <div className="App" >

        <div className="pagination-container">
          {
            this.state.urls.map(u => {
              return (
                <div
                  className="pagination-btn"
                  key={u.title}
                  id={u.title}
                  onClick={() => {
                    this.getIssues(u.url)
                    this.setState({ currentPage: u.url.slice(u.url.indexOf("page=") + 5) })
                  }}>
                  {
                    this.checkTitle(u.title, u.url)
                    //u.url.slice(u.url.indexOf("page=") + 5)
                  }
                </div>
              )
            })
          }
        </div>

        <div className="current-page">page : {this.state.currentPage}</div>

        <div className="issues-container">
          <div className="header">
            <div className="open-issues">
              <AdjustIcon fontSize="small" />
              <span>224</span>
              Open
            </div>
            <div className="closed-issues">
              <DoneIcon fontSize="small" />
              <span>1,678</span>
              Closed
            </div>
          </div>

          <div className="body">
            {
              this.state.issues ?
                this.state.issues.map(item => (
                  <Issue issue={item} key={item.id} />
                )) :
                "Nothing"
            }
          </div>
        </div>


      </div >
    );
  }
}

export default App;
