<?php

namespace App\Support;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    public static function success(mixed $data, int $status = 200): JsonResponse
    {
        return response()->json(['data' => $data], $status);
    }

    public static function successWithMeta(mixed $data, array $meta, int $status = 200): JsonResponse
    {
        return response()->json([
            'data' => $data,
            'meta' => $meta,
        ], $status);
    }

    public static function error(string $code, string $message, ?array $fields = null, int $status = 400): JsonResponse
    {
        $body = [
            'error' => [
                'code' => $code,
                'message' => $message,
            ],
        ];
        if ($fields !== null) {
            $body['error']['fields'] = $fields;
        }

        return response()->json($body, $status);
    }
}
