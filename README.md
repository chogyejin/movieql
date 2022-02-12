# movieql

Movie API with Graphql

# Init project(Introduction)

- github에서 repo 만들기(README.md, .gitignore 추가)

- 터미널에서 mkdir 후 `yarn init`, `code .`

- vscode에서 `git init`, `git remote add origin "url"`, `git pull origin main`, `yarn add graphql-yoga`

# Problems solved by Graphql

- 하나의 query에 원하는 정보만 기술한다.
- query는 url 없이 하나의 endpoint를 사용한다.

```
query {
    feed {
        comments
        likes
    }
    notifications {
        isRead
    }
    user {
        userName
        age
    }
}
```

## Over-fetching

- 요청한 영역의 정보보다 사용하지 않을 많은 정보를 서버에서 받는 것
- 비효율적이고 어떤 정보를 받았는지 모르게 됨(개발자가 구분해야 함)

## Under-fetching

- 하나의 endpoint 요청으로 필요한 정보를 모두 받을 수 없는 것
- 두 번 이상의 API 호출이 일어나고 오버헤드가 생김
