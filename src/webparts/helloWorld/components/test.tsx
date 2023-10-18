import React from "react";

class TestComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    alert("params clicked");
  };

  ReplaceWikiDescription = () => {
    // Your existing code
  };

  render() {
    return (
      <section>
        <div>
          <h2>Welcome, Brain Station-23!</h2>
          <button type="button" onClick={this.ReplaceWikiDescription}>
            Click
          </button>

          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="ExternalClass58A1693DC7D24FD18BE6F8FBAACBA474">
                    <div style="font-weight&#58;normal;font-size&#58;8pt;"> Raisul Kabir started Brain Station 23 <a href="#"
                    onclick="event.preventDefault(); this.handleClick();">Hello BS23</a>
                    The new company initially focused on the international market
                    </div>
                    </div>`,
            }}
          />

          {/* Your other JSX */}
        </div>
      </section>
    );
  }
}

export default TestComponent;
