import request from '@/utils/request'

export function fetchList(query) {
  return request.post(
    "v1/article/list",
    query,
  );
}

export function createArticle(data) {
  return request.post(
    "v1/article",
    data
  );
}

export function deleteArticle(id) {
  return request.delete("v1/article", {
    data: {
      id: id,
    },
  });
}

export function updateArticle(data) {
  return request.put(
    'v1/article',
    data
  )
}
