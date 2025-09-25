import request from '@/utils/request'

export function fetchList(query) {
  return request.post(
    "v1/article/list",
    query,
  );
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function createArticle(data) {
  return request.post(
    "/article",
    data
  );
}

export function updateArticle(data) {
  return request({
    url: '/article',
    method: 'put',
    data
  })
}
