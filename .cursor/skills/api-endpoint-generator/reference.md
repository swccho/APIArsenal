# API Endpoint Generator — Reference

## RESTful Route Group

```php
Route::prefix('posts')->group(function () {
    Route::get('/', [PostController::class, 'index']);
    Route::post('/', [PostController::class, 'store']);
    Route::get('/{post}', [PostController::class, 'show']);
    Route::put('/{post}', [PostController::class, 'update']);
    Route::delete('/{post}', [PostController::class, 'destroy']);
});
```

Use kebab-case for multi-word resources: `post-categories`, `media-files`.

## Form Request

- `Store{Resource}Request`: rules for create (required fields, unique, etc.).
- `Update{Resource}Request`: rules for update (often same as store but IDs/unique rules adjusted).
- Use `authorize()` if policy-based auth is needed.

```php
class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // or gate/policy
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'body'  => ['nullable', 'string'],
            'category_id' => ['required', 'exists:post_categories,id'],
        ];
    }
}
```

## Action Signature

Actions receive validated data or models; return model(s) or paginator. No request/response objects.

```php
// Create
public function execute(array $data): Post
{
    return Post::query()->create($data);
}

// List (paginated)
public function execute(): LengthAwarePaginator
{
    return Post::query()->latest()->paginate();
}

// Get one
public function execute(Post $post): Post
{
    return $post;
}

// Update
public function execute(Post $post, array $data): Post
{
    $post->update($data);
    return $post->fresh();
}

// Delete
public function execute(Post $post): void
{
    $post->delete();
}
```

## API Resource

- Expose only intended fields; no raw model in response.
- Use `PostResource::collection($paginator)` for index.

```php
class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'title'     => $this->title,
            'body'      => $this->body,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
```

## Tenant Safety

All project-owned models must be scoped by `project_id`. Actions and queries must run in project context (e.g. tenant-scoped model or resolved project). Do not use unscoped queries for project-owned data.
