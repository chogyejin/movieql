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

# Graphql Server

- nodemon 설치 `yarn global add nodemon` : 파일 수정할 때마다 서버 재시작

- babel 설치 : ECMAScript 2015+ 코드를 이전 JavaScript 엔진에서 실행할 수 있는 이전 버전과 호환되는 버전으로 변환하는 데 주로 사용되는 JavaScript transcompiler

  `yarn add @babel/core --dev`

  `yarn add @babel/cli --dev`

  `yarn add @babel/preset-env --dev`

  `yarn add @babel/node --dev`

  `echo '{"presets": ["@babel/preset-env"]}' > babel.config.json`

- server.start()로 서버 시작, 아직 schema 정의가 되어 있지 않음

# Creating Query and Resolver

- schema : 주거나 받을 정보에 대한 서술

  - schema.graphql : 사용자가 뭘 할지에 대해 정의한 파일

- Query : DB로부터 정보를 받을 때

  - 사용자가 Query에 name을 보내면 사용자에게 String을 보냄

- Mutation : 정보를 바꿀 때

- resolvers : schema에 정의된 Query를 해결
  - 사용자가 name Query를 보내면 어떤 것을 return하는 함수로 대답

# Extending the schema

- Playground

  - localhost:4000, endpoint는 localhost:4000/graphql

  - DB 테스트 가능

  - SCHEMA 탭에서 만들 수 있는 query의 설명을 볼 수 있음

  ```
  // playground example
  // 요청
  query {
    name
  }

  // 응답
  {
    "data": {
      "name": "chogyejin"
    }
  }
  ```

- Chogyejin이라는 type을 가진 person Query를 보내면 resolver가 chogyejin object를 return 함

  - Playground에서 원하는 정보 요청에 대한 Graphql의 응답을 확인할 수 있음

  ```
  // 요청
  query {
    person {
      age
      name
    }
  }

  // 응답
  {
    "data": {
      "person": {
        "age": 27,
        "name": "chogyejin"
      }
    }
  }
  ```

- Person이라는 array type을 가진 people Query를 보내면 resolver가 people array를 return 함

  - array 중에서도 원하는 정보(name, age)만 얻어올 수 있음

  ```
  // 요청
  query {
    people {
  		name
      age
    }
  }

  // 응답
  {
    "data": {
      "people": [
        {
          "name": "chogyejin",
          "age": 27
        },
        {
          "name": "Jisu",
          "age": 18
        },
        {
          ...
        }
      ]
    }
  }

  ```

## args 활용

1. db.js에서 object return하는 getById 작성
2. resolvers.js에서 person Query에 getById로 응답하게 작성
3. Playground에서 확인

```
 // 요청
 // 요청 보낼 때 resolver의 return에 console.log 확인 가능
 {
   person(id: 0){ // id 0번을 보내면
     name
   }
 }

 // 응답 : filter를 거쳐 name 돌려줌
 {
   "data": {
     "person": {
       "name": "chogyejin"
     }
   }
 }

```

# Defining Mutation

- Mutation에 앞서 schema.graphql, resolvers.js, db.js를 사람에서 영화 관련으로 변경

```
// 요청
{
  movies {
    name
  }
}

// 응답
{
  "data": {
    "movies": [
      {
        "name": "Star Wars - The new one"
      },
      {
        "name": "Avengers - The new one"
      },
      {
        "name": "The Godfather I"
      },
      {
        "name": "Logan"
      }
    ]
  }
}
```

- Mutation은 DB의 상태가 변할 때 사용(change of state) : Create, Update, Delete

- schema.graphql에 정의한 type에 따라 Playground에서 Query나 Mutation 요청을 할 수 있음

```
// 요청
mutation {
  addMovie(name: "명량", score: 5) {
    name
  }
}

// 응답
{
  "data": {
    "addMovie": {
      "name": "명량"
    }
  }
}

// Mutation 이후 요청
{
  movies{
    name
  }
}

// 응답
{
  "data": {
    "movies": [
      {
        "name": "Star Wars - The new one"
      },
      {
        "name": "Avengers - The new one"
      },
      {
        "name": "The Godfather I"
      },
      {
        "name": "Logan"
      },
      {
        "name": "명량"
      }
    ]
  }
}
```
