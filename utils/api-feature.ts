interface QueryObject {
  find: (filter: any) => QueryObject
  sort: (sortBy: string) => QueryObject
  select: (fields: string) => QueryObject
  skip: (skip: number) => QueryObject
  limit: (limit: number) => QueryObject
}

interface QueryString {
  [key: string]: string | undefined
}

export class APIFeatures {
   query: QueryObject
   queryString: QueryString

  constructor(query: QueryObject, queryString: QueryString) {
    this.query = query
    this.queryString = queryString
  }

  filter(): this {
    const queryObj: QueryString = { ...this.queryString }
    const excludedFields: Array<keyof QueryString> = ['page', 'sort', 'limit', 'fields']

    excludedFields.forEach((el) => delete queryObj[el])

    let queryStr: string = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy: string = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }

    return this
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields: string = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select('-__v')
    }
    return this
  }

  paginate(): this {
    const limit: number = Number(this.queryString.limit) || 100
    const page: number = Number(this.queryString.page) || 1
    const skip: number = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}
