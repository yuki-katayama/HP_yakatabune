let counter = 0
export default defineEventHandler((event) => {
  counter++
  return JSON.stringify(counter) + event.context.params.name;
})
