CREATE TABLE content (
    id uuid DEFAULT gen_random_uuid (),
    title VARCHAR NOT NULL,
    story VARCHAR NOT NULL,
    authorId uuid,
    created_at TIMESTAMP DEFAULT now (),
    PRIMARY KEY (id)
);