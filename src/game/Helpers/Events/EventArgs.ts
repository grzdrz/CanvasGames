class EventArgs<TData> {
  data: TData;

  constructor(data: TData) {
    this.data = data;
  }
}
export default EventArgs;
