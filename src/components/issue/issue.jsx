import React from "react";
import "./issue.styles.css";
import AdjustIcon from '@material-ui/icons/Adjust';

import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function dateFormat(date) {
    const newDate = new Date(date);
    return months[newDate.getMonth()] + " " + newDate.getDate() + " " + (newDate.getFullYear() === 2021 ? "" : newDate.getFullYear())
}

const Issue = ({ issue }) => {
    return (
        <div className="issue" id={issue.id}>
            <div className="main-infos">
                <AdjustIcon fontSize="small" style={{ color: "#1a7f37" }} />
                <a href={issue.html_url} className="issue-title">{issue.title}</a>

            
                {
                    issue.comments !== 0 ?
                        <div className="comments">
                            <a href={issue.html_url}>
                                <ChatBubbleOutlineOutlinedIcon style={{ fontSize: "13px" }} />
                                <span>{issue.comments}</span>
                            </a>
                        </div> :
                        ""
                }
            </div>

            <div className="details">
                <span className="issue-number">#{issue.number}</span>
                opened on
                <span>
                    {
                        dateFormat(issue.created_at)
                    }
                </span>
                by
                <span>
                    <a href={issue.user.html_url}>{issue.user.login}</a>
                </span>
            </div>
        </div>
    )
};

export default Issue;