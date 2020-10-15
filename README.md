# pact

Use Promise.all and Promise.settled as typed objects


### Example

```typescript
import Pact from "pact";

const promises = await All({
	  octocat: fetch("http://api.github.com/users/octocat"),
	  octocatJson: fetch("http://api.github.com/users/octocat").then(e => e.json()),
});
console.log(promises.octocatJson); // show json user
console.log(promises.octocat.status); // print status code (number)
```