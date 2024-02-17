test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

  const SERVER_URL = "http://localhost:4000";

  beforeEach(async () => {
    const deleteNotesResponse = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: 'DELETE',
    });
    const deleteNotesBody = await deleteNotesResponse.json();
    expect(deleteNotesResponse.status).toBe(200);
  });

  test("/postNote - Post a note", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
  
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  
    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");
  });

  test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    const getNotesResponse = await fetch(`${SERVER_URL}/getAllNotes`);
    const response = await getNotesResponse.json();

    expect(getNotesResponse.status).toBe(200);
    expect(Array.isArray(response.response)).toBe(true);
    expect(response.response.length).toBe(0);
  });
  
  test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    for (let i = 0; i < 2; i++) {
        const addNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: `NoteTitleToDelete${i}`,
            content: `NoteContentToDelete${i}`,
        }),
        });

        const { insertedId } = await addNoteResponse.json();
    }

    const getNotesResponse = await fetch(`${SERVER_URL}/getAllNotes`);
    const response = await getNotesResponse.json();

    expect(getNotesResponse.status).toBe(200);
    expect(Array.isArray(response.response)).toBe(true);
    expect(response.response.length).toBe(2);
  });
  
  test("/deleteNote - Delete a note", async () => {
    const addNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'NoteTitleToDelete',
            content: 'NoteContentToDelete',
        }),
    });

    const { insertedId } = await addNoteResponse.json();

    const deleteNoteResponse = await fetch(`${SERVER_URL}/deleteNote/${insertedId}`, {
        method: 'DELETE',
    });

    const deleteNoteBody = await deleteNoteResponse.json();

    expect(deleteNoteResponse.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${insertedId} deleted.`);
  });
  
  test("/patchNote - Patch with content and title", async () => {
    const addNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'NoteTitleToPatch',
            content: 'NoteContentToPatch',
        }),
    });

    const { insertedId } = await addNoteResponse.json();

    const patchNoteResponse = await fetch(`${SERVER_URL}/patchNote/${insertedId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'NewNoteTitle',
            content: 'NewNoteContent',
        }),
    });

    const patchNoteBody = await patchNoteResponse.json();

    expect(patchNoteResponse.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${insertedId} patched.`);
  });
  
  test("/patchNote - Patch with just title", async () => {
    const addNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'NoteTitleToPatch',
            content: 'NoteContentToPatch',
        }),
    });

    const { insertedId } = await addNoteResponse.json();

    const patchNoteResponse = await fetch(`${SERVER_URL}/patchNote/${insertedId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'NewNoteTitle',
        }),
    });

    const patchNoteBody = await patchNoteResponse.json();

    expect(patchNoteResponse.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${insertedId} patched.`);
  });
  
  test("/patchNote - Patch with just content", async () => {
    // Code here
    const addNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'NoteTitleToPatch',
            content: 'NoteContentToPatch',
        }),
    });

    const { insertedId } = await addNoteResponse.json();

    const patchNoteResponse = await fetch(`${SERVER_URL}/patchNote/${insertedId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: 'NewNoteContent',
        }),
    });

    const patchNoteBody = await patchNoteResponse.json();

    expect(patchNoteResponse.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${insertedId} patched.`);
  });
  
  test("/deleteAllNotes - Delete one note", async () => {
    const addNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'NoteTitleToDelete',
            content: 'NoteContentToDelete',
        }),
    });

    const { insertedId } = await addNoteResponse.json();

    deleteNoteResponse = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: 'DELETE',
    });

    deleteNoteBody = await deleteNoteResponse.json();

    expect(deleteNoteResponse.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`${1} note(s) deleted.`);
  });
  
  test("/deleteAllNotes - Delete three notes", async () => {
    for (let i = 0; i < 3; i++) {
        const addNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: `NoteTitleToDelete${i}`,
            content: `NoteContentToDelete${i}`,
        }),
        });

        const { insertedId } = await addNoteResponse.json();
    }
    const deleteNotesResponse = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: 'DELETE',
    });

    const deleteNotesBody = await deleteNotesResponse.json();

    expect(deleteNotesResponse.status).toBe(200);
    expect(deleteNotesBody.response).toBe(`${3} note(s) deleted.`);
  });
  
  test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    const addNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        title: 'NoteTitleToUpdateColor',
        content: 'NoteContentToUpdateColor',
        }),
    });

    const { insertedId } = await addNoteResponse.json();

    const updateColorResponse = await fetch(`${SERVER_URL}/updateNoteColor/${insertedId}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        color: '#FF0000',
        }),
    });

    const updateColorBody = await updateColorResponse.json();

    expect(updateColorResponse.status).toBe(200);
    expect(updateColorBody.message).toBe('Note color updated successfully.');
  });