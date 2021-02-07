import { Component } from "react";

interface CounterState {
  currentCount: number;
}

class Counter extends Component<{}, CounterState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState((c) => ({
      currentCount: c.currentCount + 1,
    }));
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">
          Current count: <strong>{this.state.currentCount}</strong>
        </p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.incrementCounter}
        >
          Increment
        </button>
      </div>
    );
  }
}

export default Counter;
